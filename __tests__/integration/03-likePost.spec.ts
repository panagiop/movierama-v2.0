import { VoteResult } from '../../types';
import { prisma } from '../../db/prisma';
import { createPost, likePost } from '../../services/posts';
import { createUser } from '../../services/users';

let newUser1: any;
let newUser2: any;
let newPost1: any;
let newPost2: any;

const userToSave1 = {
    name: 'testUser1',
    email: `${Math.floor(Math.random() * Date.now()).toString(36)}@test.com`,
    password: 'test123345'
};

const userToSave2 = {
    name: 'testUser2',
    email: `${Math.floor(Math.random() * Date.now()).toString(36)}@test.com`,
    password: 'test123345'
};

const postToSave1 = {
    title: `${Math.floor(Math.random() * Date.now()).toString(36)}`,
    content: 'dasdjaksd6ay7sdasd'
};

const postToSave2 = {
    title: `${Math.floor(Math.random() * Date.now()).toString(36)}`,
    content: 'dasdjaksd6ay7sdasd'
};

describe('[PUT] api/posts/:id/like/', () => {
    beforeAll(async () => {
        ({ newUser: newUser1 } = await createUser(userToSave1));
        ({ newPost: newPost1 } = await createPost(
            {
                title: postToSave1.title,
                content: postToSave1.content
            },
            newUser1.id
        ));
        ({ newUser: newUser2 } = await createUser(userToSave2));
        ({ newPost: newPost2 } = await createPost(
            {
                title: postToSave2.title,
                content: postToSave2.content
            },
            newUser1.id
        ));
    });

    afterAll(async () => {
        await prisma.postVote.delete({
            where: {
                postId_userId: {
                    postId: +newPost2.id,
                    userId: +newUser1.id
                }
            }
        });
        await prisma.post.delete({
            where: { id: newPost1.id }
        });
        await prisma.post.delete({
            where: { id: newPost2.id }
        });
        await prisma.user.delete({
            where: { id: newUser1.id }
        });
        await prisma.user.delete({
            where: { id: newUser2.id }
        });
        await prisma.$disconnect();
    });

    it(`(testUser1) should successfully like a post (published by testUser2)`, async () => {
        const result: VoteResult = await likePost({
            postId: newPost2.id,
            userId: newUser1.id
        });

        if ('message' in result) {
            expect(result.message).toEqual('thanks for voting!');
        }
    });

    it(`(testUser1) should get an error trying to like an already liked post (published by testUser2)`, async () => {
        const result: VoteResult = await likePost({
            postId: newPost2.id,
            userId: newUser1.id
        });

        if ('error' in result) {
            expect(result.error).toEqual('You have already liked this post!');
        }
    });
});
