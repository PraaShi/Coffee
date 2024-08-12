export const datefun = (p) =>
{
 let dt = p.split("-");

 let arr = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

 let month = arr[parseInt(dt[1])]

 let dat = dt[2]

    if(dat==1 || dat==21 || dat==31){
        dat += "'st"
    }
    else if(dat==2 || dat==22){
        dat += "'nd"
    }
    else if(dat==3 || dat==23){
        dat += "'rd"
    }
    else{
        dat += "'th"
    }

    return dat+' '+month
    
}

export const time =(p) => {
    
    let tim = p.split(":")

    let m =''
    if(parseInt(tim[0])<12){
        m='AM'
        if(tim[0] =='00'){
            tim[0] = 12
        }
    }
    else{
        m='PM'
        if(tim[0] != '12'){
            tim[0] -= 12
        }
    }

    return tim[0]+':'+ " "+tim[1]+m
}

