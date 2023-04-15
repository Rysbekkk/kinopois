// url
const BASE_URL = 'https://kinopoiskapiunofficial.tech/api'
const API_KEY = '9fe71323-d72d-4f68-bc14-44a352997f93'
const API_URL_POPULAR =
    BASE_URL + '/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page='
const API_URL_SEARCH = BASE_URL + '/v2.1/films/search-by-keyword?keyword='
const API_DETAILS = BASE_URL + '/v2.2/films/'
// url


// dom
const output = document.querySelector('.output')
const paginationWrap = document.querySelector('.paginationWrap')

const form = document.querySelector('form')
const input = document.querySelector('input')

// dom

// states
let activeBtn = 1
// states


const getMovies = async (url) => {
    const request = await fetch(url, {
        headers: {
            'X-API-KEY': API_KEY
        }
    })
    const response = await request.json()
    renderMovies(response.films)
    console.log(response)
    pagination(20)
}
getMovies(API_URL_POPULAR + '1')


const renderMovies = (data) => {
    
    output.innerHTML = ''
    console.log(data)
    data.forEach(el => {
        const wrap = document.createElement('div')
        const poster = document.createElement('img')
        const name = document.createElement('p')
        const rating = document.createElement('p')
        const genres = document.createElement('p')
        const year = document.createElement('p')
        // const filmId= document.createElement('p')
        // const descriptionBtn = document.createElement('button')

        wrap.className='wrap'
        rating.className='rating'
        poster.src = el.posterUrl
        // filmId.textContent=data.filmId
        // descriptionBtn.textContent='des'
        name.textContent=el.nameRu
        rating.textContent=el.rating===null || el.rating==='null' ? 'net' : el.rating
        year.textContent=el.year
        const newGenres = el.genres.map(item => item.genre).join(', ')
        genres.textContent = newGenres

        poster.addEventListener('click', () =>{
           renderDetails()
           
        })


        wrap.append(poster,name,rating, genres,year)
        output.append(wrap)

   
    })
}


const pagination = (num) => {
    
    paginationWrap.innerHTML = ''
    const paginationNumbers = []
    for (let i = 1; i <= num; i++) {
        paginationNumbers.push(i)
    }
    paginationNumbers.forEach(el => {
        const button = document.createElement('button')
        button.className = el === activeBtn ? 'active' : ''
        button.textContent = el

        button.addEventListener('click', () => {
            activeBtn=el
            getMovies(API_URL_POPULAR + el)
        })

        paginationWrap.append(button)
    })
}


const searchMovies = () => {
    
    
   

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        getMovies(API_URL_SEARCH + input.value)
        input.value=''
    })
  
}
searchMovies()

const Movies = () => {
    const button = document.querySelector('.glavnaya')
    button.addEventListener('click', () => {
        
        getMovies(API_URL_POPULAR + '1')
        
    })
    
}
Movies()

const getMoviesDetails = async(filmId) =>{
    const request = await fetch(API_DETAILS+filmId, {
        headers: {
            'X-API-KEY': API_KEY
        }
    })
    const response = await request.json()
    renderDetails(response)
}


const renderDetails = (data) =>{
    output.innerHTML=''
    const poster = document.createElement('img')
    const description = document.createElement('p')
    

    poster.src=data.posterUrl
    
    description.textContent=data.description

    output.append(poster, description)
}