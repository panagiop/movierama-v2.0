import { prisma } from '../../db/prisma';
import { createPost } from '../../services/posts';
import { createUser } from '../../services/users';

let newUser: any;
let newPost: any;
let error: any;

const userToSave = {
    name: 'testUser1',
    email: `${Math.floor(Math.random() * Date.now()).toString(36)}@test.com`,
    password: 'test123345'
};

const postToSave = {
    title: `${Math.floor(Math.random() * Date.now()).toString(36)}`,
    content: 'dasdjaksd6ay7sdasd'
};

describe('[POST] api/posts', () => {
    beforeAll(async () => {
        ({ newUser } = await createUser(userToSave));
    });

    afterAll(async () => {
        await prisma.post.delete({
            where: { id: newPost.id }
        });
        await prisma.user.delete({
            where: { id: newUser.id }
        });
        await prisma.$disconnect();
    });

    it(`should successfully create a new post and return post's details`, async () => {
        ({ newPost } = await createPost(
            {
                title: postToSave.title,
                content: postToSave.content
            },
            newUser.id
        ));

        expect(newPost).toMatchObject({
            title: postToSave.title,
            content: postToSave.content
        });
    });

    it(`should get an error trying to save a post with the same title`, async () => {
        ({ error } = await createPost(
            {
                title: postToSave.title,
                content: postToSave.content
            },
            newUser.id
        ));

        expect(error).toEqual('There is already a post with this title');
    });
});
