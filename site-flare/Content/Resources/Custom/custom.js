(function (w) {
  var _self = {
    props: {
      version: '1.0',
      prefix: 'TOPNAV:::',
      debug: true,
      isIframe: window.self !== window.top,
      prodVer: location.href.match(/\/(\d+?[\.\d]*?)\//)[1],
      scrollToTopMin: 200
    },
    log: function () {
      if (!_self.props.debug) return;
      var args = Array.prototype.slice.call(arguments);
      args.unshift(_self.props.prefix);
      console.log.apply(console, args);
    },
    version: function () {
      _self.log('version::', _self.props.version);
    },
    init: function () {
      _self.ready();
    },
    ready: function () {
      $(function () {
        debug('Registering events');
        _self.events.scroll();

        debug('Calling methods');
        var id = setInterval(function () {
          if (!$('.sideContent .menu .selected').length) return;
          clearInterval(id);
          _self.methods.sidebar();
        }, 500);
        _self.methods.breadcrumb();
        _self.methods.scrollToTop();
        _self.methods.generateNavItems();
      });
    },
    methods: {
      breadcrumb: function () {
        var prodVerUrl = location.href.match(/(^.*?)\/(\d+?[\.\d]*?)\//)[1];
        $('<a href="/"><i class="fa fa-home fa-lg"></i></a><span class="MCBreadcrumbsDivider"> &gt;&gt; </span><a href="' + prodVerUrl + '" class="MCBreadcrumbsLink">' + _self.props.prodVer + '</a><span class="MCBreadcrumbsDivider"> &gt;&gt; </span>').prependTo('.breadcrumbs');
        $('.breadcrumbs').prependTo('.main-section');
      },
      scrollToTop: function () {
        $('.body-container').scroll(function () {
          if ($('.body-container').scrollTop() >= _self.props.scrollToTopMin)
            $('.scrollToTop').addClass('show');
          else
            $('.scrollToTop').removeClass('show');
        });
        $('.scrollToTop').click(function () {
          $('.body-container').scrollTop(0);
        });
      },
      sidebar: function () {
        $('.sideContent .selected-child-parent').removeClass('selected-child-parent');
        $('.sideContent .selected-child-menu').removeClass('selected-child-menu');
        $('.sideContent .selected-child').removeClass('selected-child');

        $('.sideContent .selected').parent().addClass('selected-child');
        $('.sideContent .selected-child').parents('ul:not(.menu)').addClass('selected-child-menu');
        $('.sideContent .selected-child').parents('ul:not(.menu)').last().prev().addClass('selected-child-parent');
      },
      generateNavItems: function () {
        _self.utils.getFile({
          callback: _self.methods.buildNavItems,
          filename: '/custom.menu.js'
        });
      },
      buildNavItems: function () {
        var vMenu = null,
          rMenu = null;
        var vLabel;
        var menuStart = '<ul id="MENU_ID" class="nav-menu"><li><a href="#">MENU_LABEL<span class="caret"></span></a><ul>';
        var menuEnd = '</ul></li></ul>';

        vMenu = menuStart.replace('MENU_ID', 'version-menu');
        for (var v in versionData) {
          vLabel = versionData[v].label || v;
          if (v == _self.props.prodVer)
            vMenu = vMenu.replace('MENU_LABEL', vLabel);
          else
            vMenu += '<li><a href="' + versionData[v].url + '">' + vLabel + '</a></li>';
        }
        vMenu += menuEnd;
        $(vMenu).appendTo('.logo-wrapper');
        $('#version-menu>li>a')
          .click(function (e) {
            e.preventDefault();
            $('#version-menu>li').toggleClass('open');
          }).blur(function (e) {
            e.preventDefault();
            $('#version-menu>li').removeClass('open');
          });

        for (var r in resourcesData) {
          if (!rMenu)
            rMenu = menuStart.replace('MENU_ID', 'resources-menu').replace('MENU_LABEL', r);
          else
            rMenu += '<li><a href="' + resourcesData[r].url + '">' + r + '</a></li>';
        }
        rMenu += menuEnd;
        $(rMenu).appendTo('.logo-wrapper');
        $('#resources-menu>li>a')
          .click(function (e) {
            e.preventDefault();
            $('#resources-menu>li').toggleClass('open');
          }).blur(function (e) {
            e.preventDefault();
            $('#resources-menu>li').removeClass('open');
          });

        for (var i = 0; i < buttonsData.length; i++) {
          $(buttonsData[i]).prependTo('.nav-search-wrapper');
        }
      }
    },
    events: {
      scroll: function () {
        $('.body-container').scroll(_self.methods.sidebar);
      }
    },
    utils: {
      getVar: function (vname) {
        return $(vname).text();
      },
      getFile: function (options) {
        debug('getFile::protocol:', location.protocol);
        if (location.protocol == 'file:') {
          debug('getFile::protocol:Aborting get file on local files system');
          return false;
        }

        options.filename = options.filename || '';
        options.callback = options.callback || function () {};
        debug('getFile::options:', options);

        debug('getFile::filename:', options.filename);
        $.getScript(options.filename)
          .done(function () {
            options.callback(options);
          })
      }
    }
  };
  var debug = _self.log;
  w.TopNav = _self;
  _self.init();
})(window || {});