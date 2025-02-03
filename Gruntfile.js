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
        watch: { //observa alterações em arquivos e executa tarefas
            less: {
                files: ['src/styles/**/*.less'], //dois asteriscos para pegar todos os arquivos dentro da pasta e um asterisco para pegar todos os arquivos com a extensão especificada
                tasks: ['less:development'] //tarefa a ser executada
            },
            html: {
                files: ['src/index.html'], //arquivo a ser observado
                tasks: ['replace:dev'] //tarefa a ser executada
            }  
        },
        replace: { //substitui um padrão por outro
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',//nome do padrão a ser substituído
                            replacement: './styles/main.css' //valor que substituirá o padrão
                        },
                        {
                            match: 'ENDERECO_DO_JS',//nome do padrão a ser substituído
                            replacement: '..src/scripts/main.js' //valor que substituirá o padrão
                        }
                    ]
                },
                files: [
                    {
                        expand: true, //habilita o uso de caracteres curinga
                        flatten: true, //remove a estrutura de pastas
                        src: ['src/index.html'], //arquivo de origem
                        dest: 'dev/'} //arquivo de destino
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',//nome do padrão a ser substituído
                            replacement: '../styles/main.min.css' //valor que substituirá o padrão
                        }
                    ]
                },
                files: [
                    {
                        expand: true, //habilita o uso de caracteres curinga
                        flatten: true, //remove a estrutura de pastas
                        src: ['prebuild/index.html'], //arquivo de origem
                        dest: 'dist/'} //arquivo de destino
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
        uglify: {
            options: {
                mangle: true,
                compress: true,
                sourceMap: true
            },
            my_target: {
                files: {
                    'dist/scripts/main.min.js': ['src/scripts/main.js'] //arquivo de destino: arquivo de origem
                }
            }
        },
        clean: ['prebuild'] //remove arquivos
    })

    grunt.loadNpmTasks('grunt-contrib-less'); //carrega o plugin less
    grunt.loadNpmTasks('grunt-contrib-watch'); //carrega o plugin watch
    grunt.loadNpmTasks('grunt-replace'); //carrega o plugin replace
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //carrega o plugin htmlmin
    grunt.loadNpmTasks('grunt-contrib-clean'); //carrega o plugin clean
    grunt.loadNpmTasks('grunt-contrib-uglify'); //carrega o plugin uglify

    grunt.registerTask('default', ['watch']); //tarefa padrão
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'uglify', 'clean']); //tarefa de build
}