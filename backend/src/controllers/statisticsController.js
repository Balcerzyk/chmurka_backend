import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

export default {

    async getStatistics(req, res) {
        const allMovies = await prisma.movie.findMany();

        let currYear = new Date().getFullYear();

        let runtimeCounter= 0;
        let adultMoviesCounter = 0;
        let moviesAgeCounter = 0;
        allMovies.forEach(function(item, index) {
            runtimeCounter += item.runtimeMinutes;
            if(item.isAdult) 
                adultMoviesCounter++;
            moviesAgeCounter = currYear - item.startYear;
            
        });
        let runtimeAvg = runtimeCounter / allMovies.length;
        let moviesAgeAvg = moviesAgeCounter / allMovies.length;
        let isAdultPercentage = adultMoviesCounter * 100 / allMovies.length;

        let stats = {
            averageRuntime: runtimeAvg,
            averageAge: moviesAgeAvg,
            adultPercentage: isAdultPercentage

        }

        return res.status(200).send({data: stats});
    }
}