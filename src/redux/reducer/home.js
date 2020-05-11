const initialState = {
    asal:'Cari Alamat Asal',
    origin:'',
    tujuan:'Cari Alamat Tujuan',
    destination:'',
}

const Home = (state = initialState,action) => {
    switch(action.type){
        case 'SET_ASAL':
            return {
                ...state,
                asal:action.asal,
                origin:action.id
            }
        case 'SET_TUJUAN':
            return {
                ...state,
                tujuan:action.tujuan,
                destination:action.destination
            }
        default:
            return state
    }
}

export default Home;