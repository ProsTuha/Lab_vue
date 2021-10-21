import { Container } from 'inversify';
import { TYPES } from './types';
import { Warrior, Weapon, ThrowableWeapon } from './interfaces';
import { Ninja, Katana, Shuriken } from './entities';

const inversifyContainer = new Container();
inversifyContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
inversifyContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
inversifyContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export { inversifyContainer };
