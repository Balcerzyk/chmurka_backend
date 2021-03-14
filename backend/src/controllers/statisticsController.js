import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

export default {

    async getStatistics(req, res) {
        const allMovies = await prisma.movie.findMany();
        let runtimeSum = 0;
        allMovies.forEach(function(item, index) {
            runtimeSum += item.runtimeMinutes;
        });

        let avg = runtimeSum / allMovies.length;
        return res.status(200).send({data: avg});
    }
}