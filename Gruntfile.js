module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('coffeeify');
    grunt.loadNpmTasks('uglifyify');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        browserify: {
            options: {
                browserifyOptions: {
                    debug: true,
                    transform: ["coffeeify", "uglifyify"],
                    extensions: [".coffee"]
                }
            },
            dev: {
                src: ["src/js/*.coffee"],
                dest: "www/js/app.js"
            }
        },
        sass: {
            options: {
                outputStyle: "compressed"
            },
            dist: {
                files: {
                    "www/css/main.css": "src/styles/main.sass"
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: "www",
                    livereload: true
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            scripts: {
                files: "src/js/*.coffee",
                tasks: ["browserify"]
            },
            styles: {
                files: "src/styles/*.sass",
                tasks: ["sass"]        
            },
            html: {
                files: "www/index.html"
            }
        }
    });

    grunt.registerTask("default", [
        "browserify",
        "sass",
        "connect:server",
        "watch"
    ]);
}