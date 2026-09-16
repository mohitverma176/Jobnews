const fs=require('fs');
const path=require('path');
const chalk=require("chalk");
function savejson(data,filename){
    const dir=path.join(__dirname,"data");
    if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{
                recursive:true
            });
        }
        const filepath=path.join(dir,filename);
        fs.writeFileSync(
            filepath,
              JSON.stringify(data,null,2),
                );
                console.log(chalk.green("data is saved in"), `${dir} with name of${filename}`);
}
module.exports=savejson;