class Environment {

  static stage = `${process.env.STAGE}`.toUpperCase();

  static getStagedEnv(name: string) {
    return process.env[`${Environment.stage}_${name}`];
  }
  static getEnv(name: string) {
    return process.env[name];
  }
}

export { Environment };