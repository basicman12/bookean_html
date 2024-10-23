function topSlider(selecor){
    var interval;
    var speed = 6000;
    var animSpeed = 2000;
    intrval = setInterval(function(){
        var $this = $(selecor);
        var $active = $(selecor + ' li.active');
        $active.fadeOut(animSpeed, function(){
            $active.removeClass('active');
        });
        if($active.is('li:last-child')){
            $this.find('li:first-child').fadeIn(animSpeed, function(){
                $this.find('li:first-child').addClass('active');
            });
        } else {
            $active.next().fadeIn(animSpeed, function(){
                $active.next().addClass('active');
            });
            $active.next().addClass('active');
        }
    },speed);
}

$(document).ready(function(){
    topSlider('#topSlider');

    var $sliderSelector = $('ul.topMenu li.isParent');
    $sliderSelector.find('> a').bind('click', function(){
        var $this = $(this).parent();
        var $topMenuSub = $('.topMenuSub');
        if($this.hasClass('active') && $topMenuSub.is(':visible')){
            $topMenuSub.hide();
            $this.removeClass('active');
        } else {
            var $level_2 = $this.find('.sub_menu');
            var left = Math.floor($this.position().left);
            var l2Left = parseInt($level_2.css('left').replace('px',''));
            var menuWidth = $('ul.topMenu').outerWidth();
            var newWidth = menuWidth - left - l2Left;
            $level_2.css('width',newWidth);
            var height = $level_2.css('height');
            $sliderSelector.removeClass('active');
            $this.addClass('active');
            $topMenuSub.css('height',height);
            $topMenuSub.show();
        }
        return false;
    });

    $('select.styled').each(function(){
        var $this = $(this);
        $this.hide();
        $this.wrap('<div class="select-wrap" data-name="'+$this.attr('name')+'" data-id="'+$this.attr('id')+'"></div>');
        var $wrap = $this.parent();
        var $option;
        var options = '';
        if($this.find('option:selected')){
            $option = $this.find('option:selected');
        } else {
            $option = $this.find('option:first');
        }
        $wrap.append('<a href="javascript:;" class="selected"><span class="text g-left">'+$option.text()+'</span><i class="icon down g-right"></i><i class="g-clr"></i></a>');

        $this.find('option').each(function(){
            var $opt = $(this);
            options += '<a href="" data-value="'+$opt.val()+'">'+$opt.text()+'</a>';
        });
        $wrap.append('<div class="options" style="display:none;">'+options+'</div>');
        var $selected = $wrap.find('.selected');
        var $options = $wrap.find('.options');
        $selected.find('.text').css('width',parseInt($selected.css('width').replace('px','')-15));
        $options.find('a').css('width',$selected.css('width'));
        $wrap.find('a.selected').bind('click', function(){
            if($options.is(':visible')){
                $options.hide();
                $wrap.removeClass('open');
            } else {
                $('.select-wrap').removeClass('open');
                $('.select-wrap .options').hide();
                $options.show();
                $wrap.addClass('open');
            }
            return false;
        });
        $options.find('a').bind('click', function(){
            var $opt = $(this);
            var val = parseInt($opt.data('value'));
            $selected.find('.text').text($opt.text());
            $this.find('option').each(function(){
                var $realOpt = $(this);
                if(parseInt($realOpt.val()) === val){
                    $realOpt.attr('selected',true);
                } else {
                    $realOpt.attr('selected',false);
                }
            });
            $options.hide();
            $wrap.removeClass('open');
            return false;
        });
    });
    $('.extendFilter').hide();

    $('.filterButton').bind('click', function(){
        var $this = $(this);
        var $extendFilter = $('.extendFilter');
        if($this.hasClass('active')){
            $this.removeClass('active');
            $extendFilter.slideUp();
        } else {
            $this.addClass('active');
            $extendFilter.slideDown();
        }
        return false;
    });
    $('.extendFilter .upLink').bind('click', function(){
        $('.filterButton').trigger('click');
        return false;
    });
    $('.extendFilter .icon.search_2').bind('click', function(){
        $(this).closest('.itext-wrap').find('.inputText').focus();
        return false;
    });

    $('.tabs .tab:first').addClass('active');
    $('.tabs .body').hide();
    $('.tabs .body:first').show();
    $('.tabs .tab').bind('click',function(){
        var $this = $(this);
        $('.tabs .body').hide();
        $('.tabs .tab').removeClass('active');
        $($this.attr('href')).show();
        $this.addClass('active');
        return false;
    });
});
