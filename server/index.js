const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const compiler = require('compilex')
const options = { stats: true }
compiler.init(options)

app.use(bodyparser.json())
app.use(cors())

app.get('/', (req, res) => {
    compiler.flush(() => console.log('deleted'))
})

app.post('/compile', (req, res) => {

    const code = req.body.code
    const input = req.body.input
    const lang = req.body.lang

    try {
        
        //?starting of switch statement
        switch (lang) {
            case "c" :
                if (!input) {
                    var envData = { OS: "windows", cmd: "g++" };
            
                    compiler.compileCPP(envData, code, function (data) {
                        res.send(data);
                    });
                } else {
                    var envData = { OS: "windows", cmd: "g++" };
            
                    compiler.compileCPPWithInput(envData, code, input, function (data) {
                        res.send(data);
                    });
                }
                break;

            case "cpp" :
                if (!input) {
                    var envData = { OS: "windows", cmd: "g++" };
            
                    compiler.compileCPP(envData, code, function (data) {
                        res.send(data);
                    });
                } else {
                    var envData = { OS: "windows", cmd: "g++" };
            
                    compiler.compileCPPWithInput(envData, code, input, function (data) {
                        res.send(data);
                    });
                }
                break;
        
            case "java":
                if (!input) {
                    var envData = { OS: "windows" };
            
                    compiler.compileJava(envData, code, function (data) {
                        res.send(data);
                    });
                } else {
                    var envData = { OS: "windows" };
            
                    compiler.compileJavaWithInput(envData, code, input, function (data) {
                        res.send(data);
                    });
                }
                break;
        
            case "py":
                if (!input) {
                    var envData = { OS : "windows"}; 
            
                    compiler.compilePython( envData , code , function(data){
                        res.send(data);
                    });  
                } else {
                var envData = { OS : "windows"}; 
            
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    res.send(data);        
                });
                }
                break;
        
            default:
                res.send({message:"Language execution not available for now '_'"})
                break;
        }
        //?ending of switch statement

    } catch (error) {
        console.log(error)
    }

})

app.listen(3000)