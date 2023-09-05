import { prisma } from '../../db/prisma';
import { createUser } from '../../services/users';

let newUser: any;
let error: any;

const userToSave = {
    name: 'testUser',
    email: `${Math.floor(Math.random() * Date.now()).toString(36)}@test.com`,
    password: 'test123345'
};

describe('[POST] api/register', () => {
    beforeEach(async () => {
        ({ newUser, error } = await createUser(userToSave));
    });

    afterAll(async () => {
        await prisma.user.delete({
            where: { email: userToSave.email }
        });
        await prisma.$disconnect();
    });

    it(`should successfully create a user and return user's details`, async () => {
        expect(newUser).toMatchObject({
            name: userToSave.name,
            email: userToSave.email
        });
    });

    it(`should fail when try to create an existing user`, async () => {
        expect(error).toEqual('User already exists');
    });
});
