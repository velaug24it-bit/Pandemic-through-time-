/**
 * simulationEngine.js
 * Real-Time Mathematical SEIR Pandemic Propagation & Operations Engine:
 *  - S: Susceptible population (8.0 Billion baseline)
 *  - E: Exposed population
 *  - I: Active Infected population
 *  - R: Recovered & Immunized population
 *  - D: Deceased population
 * Calculates:
 *  - Dynamic Reproduction Rate R(t) based on active policy directives
 *  - ICU Occupancy & Hospital Capacity Strain %
 *  - Vaccination Coverage Progression %
 *  - Regional resource allocation effects & decision timeline log
 */
import { OUTBREAK_SCENARIOS, POLICY_DIRECTIVES } from './constants';

export class SimulationEngine {
  constructor(scenarioId = 'covid') {
    this.setScenario(scenarioId);
  }

  setScenario(scenarioId) {
    const scenario = OUTBREAK_SCENARIOS.find(s => s.id === scenarioId) || OUTBREAK_SCENARIOS[0];
    this.scenario = scenario;
    this.day = 1;
    this.population = 8000000000; // 8.0 Billion baseline
    this.susceptible = 7999990000;
    this.exposed = 5000;
    this.infected = 5000;
    this.recovered = 0;
    this.deceased = 0;

    this.baseR0 = scenario.r0;
    this.currentR0 = this.baseR0;

    this.hospitalCapacity = 25000000; // 25M global ICU beds
    this.icuOccupancy = 0.05; // 5% base strain
    this.vaccineCoverage = 0.0;
    this.fundingBalance = 100; // $100B starting fund

    this.activePolicies = new Set();
    this.decisionHistory = [];
  }

  /** Step simulation by 1 day */
  step(speed = 1) {
    for (let s = 0; s < speed; s++) {
      this.day += 1;

      // 1. Calculate effective R(t) with active policies
      let policyR0Reduction = 0;
      this.activePolicies.forEach(policyId => {
        const p = POLICY_DIRECTIVES.find(d => d.id === policyId);
        if (p) policyR0Reduction += p.r0Impact;
      });

      this.currentR0 = Math.max(0.35, this.baseR0 + policyR0Reduction - (this.vaccineCoverage * 2.2));

      // 2. SEIR Differential Approximations
      const beta = (this.currentR0 * 0.12) / this.population;
      const gamma = 1 / (this.scenario.recoveryRate || 12);
      const sigma = 1 / (this.scenario.incubation || 5);
      const baseFatality = (this.scenario.hospitalization || 15) * 0.001;

      const newExposed = Math.min(this.susceptible, Math.round(beta * this.susceptible * this.infected));
      const newInfected = Math.min(this.exposed, Math.round(sigma * this.exposed));
      const newRecovered = Math.round(gamma * (1 - baseFatality) * this.infected);
      const newDeceased = Math.round(gamma * baseFatality * this.infected * (this.icuOccupancy > 0.85 ? 2.8 : 1.0));

      this.susceptible = Math.max(0, this.susceptible - newExposed);
      this.exposed = Math.max(0, this.exposed + newExposed - newInfected);
      this.infected = Math.max(0, this.infected + newInfected - newRecovered - newDeceased);
      this.recovered += newRecovered;
      this.deceased += newDeceased;

      // 3. Hospital Capacity Strain
      const severeCases = Math.round(this.infected * ((this.scenario.hospitalization || 15) * 0.01));
      let effectiveBeds = this.hospitalCapacity;
      if (this.activePolicies.has('icuBeds')) effectiveBeds *= 1.4;
      if (this.activePolicies.has('emergencyHospitals')) effectiveBeds *= 1.3;

      this.icuOccupancy = Math.min(1.0, severeCases / effectiveBeds);

      // 4. Vaccine Rollout Progression
      let vRate = 0.0005;
      if (this.activePolicies.has('vaccineProd')) vRate += 0.0015;
      if (this.activePolicies.has('startVaccination')) vRate += 0.003;
      this.vaccineCoverage = Math.min(0.95, this.vaccineCoverage + vRate);
    }

    return this.getState();
  }

  /** Toggle policy directive */
  togglePolicy(policy) {
    if (this.activePolicies.has(policy.id)) {
      this.activePolicies.delete(policy.id);
      this.decisionHistory.push({ day: this.day, action: `Repealed Policy: ${policy.title}`, type: 'repeal' });
    } else {
      this.activePolicies.add(policy.id);
      this.decisionHistory.push({ day: this.day, action: `Enacted Policy: ${policy.title}`, type: 'enact' });
    }
  }

  /** Get snapshot state */
  getState() {
    return {
      day: this.day,
      scenario: this.scenario,
      population: this.population,
      susceptible: this.susceptible,
      exposed: this.exposed,
      infected: this.infected,
      recovered: this.recovered,
      deceased: this.deceased,
      currentR0: parseFloat(this.currentR0.toFixed(2)),
      icuOccupancy: parseFloat((this.icuOccupancy * 100).toFixed(1)),
      vaccineCoverage: parseFloat((this.vaccineCoverage * 100).toFixed(1)),
      activePolicies: Array.from(this.activePolicies),
      decisionHistory: this.decisionHistory,
    };
  }
}
