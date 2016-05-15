$(document).ready(function() {
    function actualizar(){
        $.ajax({
        url: "https://andreihelo-restful-api.herokuapp.com/students",
        success: function (result, status, xhr) {
            var botonCargar = $("<button id='br'><i class='fa fa-trash fa-2x' aria-hidden='true'></i></button>");
            var botonCambiar = $("<button id='cr'><i class='fa fa-floppy-o fa-2x' aria-hidden='true'></i></button>")
            $("tbody").children().remove();
            for (var i = 0; i < result.length; i++) {
                $("tbody").append(
                "<tr><td>"+result[i].id+"</td><td>" + result[i].registration_number + "</td><td>" + result[i].name +
                "</td><td>" + result[i].last_name + "</td><td>"+result[i].status+"</td><td class='br'></td><td class='cr'></td></tr>"
                    );
                }
            $(".br").append(botonCargar);
            $(".cr").append(botonCambiar);
        }
    });
    };
    actualizar();
    //Esconder los inputs
    $("#overlap").hide();
    $("aside").hide();
    //Abrir los inputs
    $("#add").click(function(){
        $("#cambiar").hide();
        $("#guardar").show();
        $("#overlap").slideDown("slow");
        $("#main").animate({opacity: "0.2"}, "slow");
    });
    //Cerrar los inputs
    $("#overlap > button:first").click(function(){
        $("#overlap").slideUp("slow");
        $("#main").animate({opacity: "1.0"}, "slow");
        $("#cambiar").show();
    });
    //Agregar Estudiantes
    $("#guardar").click(function(){
        var estudiante = {
            "registration_number" : parseInt($("input[name*=Matricula]").val()),
            "name"                : $("input[name*=Nombre]").val(),
            "last_name"           : $("input[name*=Apellido]").val(),
            "status"              : $("select option:selected").val()
        };
        $.ajax({
            url: "https://andreihelo-restful-api.herokuapp.com/students",
            method: "POST",
            data: estudiante,
            success: function (result, status, xhr) {
                actualizar();
                $("#overlap").slideUp("slow");
                $("div:not(#overlap)").animate({opacity: "1.0"}, "slow");
                $("#cambiar").show();
                $("aside").slideUp("fast");
        },
            statusCode:{
                400: function(){
                    $("aside").slideDown("fast");
                }
            }
     });
    });
    //Borrar Estudiantes
    $("tbody").on("click","#br",function() {
        var id= parseInt($(this).parent().siblings().first().text());
        $.ajax({
            url: "https://andreihelo-restful-api.herokuapp.com/students/"+id,
            method: "POST",
            data: "_method=DELETE",
            success: function (result, status, xhr) {
                actualizar();
        }
     });
       
    });
    //actualizar
    $("thead").on("click","#update",function(){
        actualizar();
    });
    //cambiar
    $("tbody").on('click','#cr',function(){
        var id = parseInt($(this).parent().prev().prev().prev().prev().prev().prev().text());
        var matricula = parseInt($(this).parent().prev().prev().prev().prev().prev().text());
        var nombre = $(this).parent().prev().prev().prev().prev().text();
        var apellido = $(this).parent().prev().prev().prev().text();
        var status = $(this).parent().prev().prev().text();
        console.log(id);
        $("input[name*=Matricula]").val(matricula);
        $("input[name*=Nombre]").val(nombre);
        $("input[name*=Apellido]").val(apellido);
        
        $("#guardar").hide();
        $("#overlap").slideDown("slow");
        $("#main").animate({opacity: "0.2"}, "slow");
        
        $("#cambiar").on("click",function(){
            
            var estudiante = {
            "registration_number" : parseInt($("input[name*=Matricula]").val()),
            "name"                : $("input[name*=Nombre]").val(),
            "last_name"           : $("input[name*=Apellido]").val(),
            "status"              : $("select option:selected").val(),
            "_method"             : "_method=PUT"
            };
            console.log(estudiante);
            console.log(id);
            $.ajax({
                url: "https://andreihelo-restful-api.herokuapp.com/students/"+id,
                method: "POST",
                data: estudiante,
                success: function (result, status, xhr) {
                    actualizar();
                    $("#overlap").slideUp("slow");
                    $("div:not(#overlap)").animate({opacity: "1.0"}, "slow");
                    $("#guardar").show();
                    id = null;
                    $("aside").slideUp("fast");
            },
                statusCode:{
                 400: function(){
                    $("aside").slideDown("fast");
                }
            }
     });
            
        });
    });
    
    
});