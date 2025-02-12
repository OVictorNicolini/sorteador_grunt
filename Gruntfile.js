module.exports = function(grunt) {
    grunt.initConfig({ //configuração do grunt
        pkg: grunt.file.readJSON('package.json'), //leitura do arquivo package.json
        less: { //compila arquivos less em css
            development:{
                files: {
                    'dev/styles/main.css': 'src/styles/main.less' //arquivo de destino: arquivo de origem
                    }
                },
            production:{
                options: {
                    compress: true, //comprime o arquivo
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less' //arquivo de destino: arquivo de origem
                }
            }
        },
        watch: { //observa alterações nos arquivos
            less: {
                files: ['src/styles/**/*.less'], //arquivos a serem observados
                tasks: ['less:development'] //tarefa a ser executada
            },
            html: {
                files: ['src/index.html'], //arquivos a serem observados
                tasks: ['replace:dev'] //tarefa a ser executada
            }
        },
        replace: { //substitui strings nos arquivos
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS', //string a ser substituída
                            replacement: './styles/main.css' //string de substituição
                        },
                        {
                            match: 'ENDERECO_DO_JS', //string a ser substituída
                            replacement: '../src/scripts/main.js' //string de substituição
                        }
                    ]
                },
                files: [
                    {expand: true, 
                        flatten: true, 
                        src: ['src/index.html'], //arquivo de origem
                        dest: 'dev/'} //arquivo de origem e destino
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS', //string a ser substituída
                            replacement: './styles/main.min.css' //string de substituição
                        },
                        {
                            match: 'ENDERECO_DO_JS', //string a ser substituída
                            replacement: './scripts/main.min.js' //string de substituição
                        }
                    ]
                },
                files: [
                    {expand: true, 
                        flatten: true, //não cria subpastas
                        src: ['prebuild/index.html'], //arquivo de origem
                        dest: 'dist/'} //arquivo de origem e destino
                ]
            }
        },
        htmlmin: { //minifica arquivos html
            dist: {
                options: {
                    removeComments: true, //remove comentários
                    collapseWhitespace: true //remove espaços em branco
                },
                files: {
                    'prebuild/index.html' : 'src/index.html' //arquivo de destino: arquivo de origem
                }
            }
        },
        clean: ['prebuild'], //apaga a pasta prebuild
        uglify: { //minifica arquivos js
            target: {
                files: {
                    'dist/scripts/main.min.js': ['src/scripts/main.js'] //arquivo de destino: arquivo de origem
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less'); //carrega o plugin less
    grunt.loadNpmTasks('grunt-contrib-watch'); //carrega o plugin watch
    grunt.loadNpmTasks('grunt-replace'); //carrega o plugin replace
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //carrega o plugin htmlmin
    grunt.loadNpmTasks('grunt-contrib-clean'); //carrega o plugin clean
    grunt.loadNpmTasks('grunt-contrib-uglify'); //carrega o plugin uglify

    grunt.registerTask('default', ['watch']); //tarefa padrão
    grunt.registerTask('build', ['less:production','htmlmin:dist','replace:dist','clean', 'uglify']); //tarefa de build
}