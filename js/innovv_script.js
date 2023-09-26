(function($) {
	"use strict";
    var lastId,
    topMenu = $(".menu-holder"),
    topMenuHeight = 55,
    // lista todos os itens
    menuItems = topMenu.find("a"),
    // Ancoras correspondentes para o item de menu
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      
      if (item.length) { 
         return item; 
      }
    });

    if($(window).width()<=767){
      topMenuHeight = 0;
    }

    // Vincular o manipulador de cliques aos itens de menu
	  // para que possamos obter uma animação de rolagem sofisticada
    menuItems.click(function(e){
      var href = $(this).attr("href");
      var offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
      
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      
      e.preventDefault();
    });
	  
    // Vincular para rolar
    $(window).scroll(function(){
      // Obtenha a posição de rolagem do contêiner
      var fromTop = $(this).scrollTop()+topMenuHeight;
       
      // Obtenha o ID do item de rolagem atual
      var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
          return this;
      });
      
      // Obtenha o id do elemento atual
      cur = cur[cur.length-1];
      var id = cur && cur.length ? cur[0].id : "";
       
      if (lastId !== id && id != "") {
        lastId = id;
        // Definir/remover classe ativa
        menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
      }

      changeNavMenu();
    });

    // menu móvel e menu desktop
    $("#responsive-menu").css({"right":-1500});
    $("#mobile_menu").click(function(){
        $("#responsive-menu").show();
        
        if($("#responsive-menu").css("right") == "-1500px") 
        {
          $("#responsive-menu").animate({ "right":0 }, 400);
        }
        else
        {
          $("#responsive-menu").animate({ "right":-1500 }, 400);
        }
        
        return false;
    });
    $(window).on("load resize", function(){
        changeNavMenu();
    });

    $("#responsive-menu a").click(function(){
      $("#responsive-menu").animate({ "right":-1500 }, 400);
    });

})(jQuery);

function changeNavMenu(){
  if($(window).width()>767)
  {
    $("#responsive-menu").css({"right":-1500});

    if ($(window).scrollTop() > 1)
    {
      $('.templatemo-site-header').addClass("sticky");        
    }
    else 
    {
      $('.templatemo-site-header').removeClass("sticky");
    } 
  }
  else {
    $('.templatemo-site-header').removeClass("sticky");
  }
}


function detectIE(){
  // Detecte o IE e anexe a classe ao elemento <html>
  var UA = navigator.userAgent;
  var html = document.documentElement;
  if (UA.indexOf("IEMobile") === -1) {
      if ((UA.indexOf("rv:11.") !== -1) && (!html.classList.contains('ie11')) && window.navigator.msPointerEnabled) {
          html.classList.add("ie11");
      } else if ((UA.indexOf("MSIE 10.") !== -1) && (!html.classList.contains('ie10')) && window.navigator.msPointerEnabled) {
          html.classList.add("ie10");
      }
  }
}


// DARK MODE
function changeTheme() {
  var element = document.body;
   element.classList.toggle("dark");
}

function changeBtn(x) {
  x.classList.toggle("fa-moon-o")
}




