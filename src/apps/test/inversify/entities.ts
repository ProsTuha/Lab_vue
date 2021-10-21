import { injectable, inject } from 'inversify';
import { Weapon, ThrowableWeapon, Warrior } from './interfaces';
import { TYPES } from './types';

@injectable()
class Katana implements Weapon {
  public hit() {
    return 'cut!';
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw() {
    return 'hit!';
  }
}

@injectable()
class Ninja implements Warrior {
  @inject(TYPES.Weapon) private katana!: Weapon;
  @inject(TYPES.ThrowableWeapon) private shuriken!: ThrowableWeapon;

  public fight() { return this.katana.hit(); }
  public sneak() { return this.shuriken.throw(); }
}

export { Ninja, Katana, Shuriken };
