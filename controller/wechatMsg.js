const axios = require('axios')
module.exports.weather = async (cityName)=>{
    try{
        let weatherRes =  await axios.get('https://api.shenjian.io/?appid=1be8ff3c27dfcda0b034eae937e7478d',{
            params:{
                city_name:cityName
            }
        })
        return {
            ok:true,
            weather:weatherRes.data
        }
    }catch(err){
        return {
            ok:false
        }
    }
   

}