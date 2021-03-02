const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.movie.create({
    data: {        
      tconst: "test",         
      titleType: "test",      
      primaryTitle: "test",    
      orginalTitle: "test",    
      isAdult: true,           
      startYear: 2012,       
      endYear: 2017,         
      runtimeMinutes: 312,  
      genres: "lel"          
    }
  })

  const allMovies = await prisma.movie.findMany()
  console.log(allMovies)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })