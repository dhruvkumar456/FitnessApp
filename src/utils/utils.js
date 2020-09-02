const request=require('request')

const fooddetails=(food,callback)=>{
    const url=`https://api.edamam.com/api/food-database/v2/parser?ingr=`+encodeURIComponent(food)+`&app_id=b723b550&app_key=b725f31c75a5ef1ac2bf5dfe94353b85`
    request({url,json:true},(error,res)=>{
        if(error){
            callback('Network error ',undefined)
        }else if(!res.body.parsed[0]){
            callback('Try Another Name',undefined)
        }else{
            callback(undefined,{
                foodname:res.body.parsed[0].food.label,
                energy:res.body.parsed[0].food.nutrients.ENERC_KCAL+` Kcal`,
                protein:res.body.parsed[0].food.nutrients.PROCNT+` g`,
                fat:res.body.parsed[0].food.nutrients.FAT+` g`,
                carbs:res.body.parsed[0].food.nutrients.CHOCDF+` g`,
                fibre:res.body.parsed[0].food.nutrients.FIBTG+` g`
            })
        }
        
    })
}
module.exports=fooddetails


