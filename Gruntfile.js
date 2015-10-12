module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-sass');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        coffee: {
            compile: {
                files: {
                    "www/js/app.js": ["src/js/*.coffee"]
                }
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
        uglify: {
            www: {
                src: "www/js/app.js",
                dest: "www/js/app.min.js"
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
                livereload: true
            },
            scripts: {
                files: "src/js/*.coffee",
                tasks: ["coffee", "uglify"]
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
        "coffee",
        "sass",
        "uglify",
        "connect:server",
        "watch"
    ]);
}