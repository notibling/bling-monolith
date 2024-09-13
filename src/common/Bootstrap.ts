type BootstrapProcess = () => Promise<void>;

class Bootstrap {
  processes: BootstrapProcess[] = [];
  static #instance: Bootstrap;
  static getInstance(processes: BootstrapProcess[]) {
    if (Bootstrap.#instance) {
      Bootstrap.#instance = new Bootstrap();
      Bootstrap.#instance.processes = processes;
    }

    return Bootstrap.#instance
  }
  run() {
    return Promise.all(this.processes.map((process) => process()));
  }
}