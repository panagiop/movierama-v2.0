import { PrismaClient, Prisma } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: 'Alice',
        email: 'alice@prisma.io',
        password: createHash('sha256').update('test123').digest('hex'),
        posts: {
            create: [
                {
                    title: 'Join the Prisma Slack',
                    content: 'https://slack.prisma.io',
                    numberOfLikes: 0,
                    numberOfDislikes: 0
                }
            ]
        }
    },
    {
        name: 'Nilu',
        email: 'nilu@prisma.io',
        password: createHash('sha256').update('test123').digest('hex'),
        posts: {
            create: [
                {
                    title: 'Follow Prisma on Twitter',
                    content: 'https://www.twitter.com/prisma',
                    numberOfLikes: 0,
                    numberOfDislikes: 0
                }
            ]
        }
    },
    {
        name: 'Mahmoud',
        email: 'mahmoud@prisma.io',
        password: createHash('sha256').update('test123').digest('hex'),
        posts: {
            create: [
                {
                    title: 'Ask a question about Prisma on GitHub',
                    content: 'https://www.github.com/prisma/prisma/discussions',
                    numberOfLikes: 0,
                    numberOfDislikes: 0
                },
                {
                    title: 'Prisma on YouTube',
                    content: 'https://pris.ly/youtube',
                    numberOfLikes: 0,
                    numberOfDislikes: 0
                }
            ]
        }
    }
];

async function main() {
    console.log(`Start seeding ...`);
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u
        });
        console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
