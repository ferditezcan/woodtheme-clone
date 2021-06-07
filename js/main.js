window.onload = () => {
    const loader = {
        init:function(){
            this.loading();
        },
        loading:function(){
            const loader = document.querySelector('.loader');
            
            function hide(){
                loader.classList.add('hide');
            }

            setTimeout(hide, 3000);
        }
    }
    loader.init();

    const navigation = {
        init: function () {
            this.menu();
            this.submenu();
            this.tab();
        },
        menu: function () {
            const menu = document.querySelector('.mobile');
            const open = document.querySelector('.nav__button')
            const close = document.querySelector('.closeMenu');

            open.addEventListener('click', () => {
                menu.classList.add('active');
                close.classList.add('active');
            })

            close.addEventListener('click', () => {
                menu.classList.remove('active');
                close.classList.remove('active');
            })
        },
        submenu: function () {
            const btn = document.querySelectorAll('.arrow');

            btn.forEach(item => item.addEventListener('click', (e) => {
                const parent = e.target.parentNode;

                e.target.classList.toggle('active');
                parent.classList.toggle('active');

                const link = parent.querySelector('.link');

                if (link == null) return;
                link.classList.toggle('show');
            }))
        },
        tab: function () {
            const btn = document.querySelectorAll('.mobile__tab-control .tab__item');
            const tabList = document.querySelectorAll('.tab__list');

            btn.forEach((item, index) => item.addEventListener('click', (e) => {
                btn.forEach(i => i.classList.remove('active'));
                e.target.classList.add('active');

                tabList.forEach(tab => tab.classList.remove('active'));
                const tabSelf = tabList[index];
                tabSelf.classList.add('active');
            }))
        }
    }
    navigation.init();

    const slider = {
        init: function () {
            this.slide();
            this.changeImage('.firstSlide');
            this.changeImage('.secondSlide');
        },
        slide: function () {
            const circleBtn = document.querySelectorAll('.circle span');
            const wrap = document.querySelector('.banner .slider');
            const item = document.querySelectorAll('.banner .slider__item');
            const leftBtn = document.querySelector('.banner .buttonLeft');
            const rightBtn = document.querySelector('.banner .buttonRight');

            if (item.length == 0) return;
            let size = item[0].offsetWidth;
            let count = 0;

            circleBtn.forEach(btn => btn.addEventListener('click', (e) => {
                circleBtn.forEach(i => i.classList.remove('active'));
                e.target.classList.add('active');

                let index = e.target.dataset.slide;

                item.forEach(it => it.classList.remove('active'));
                item[index].classList.add('active');

                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = size * index;
            }))

            leftBtn.addEventListener('click', () => {
                if (count == 0) return;
                count--;

                item.forEach(it => it.classList.remove('active'));
                item[count].classList.add('active');

                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = size * count;
            })

            rightBtn.addEventListener('click', () => {
                if (count >= item.length - 1) return;
                count++;

                item.forEach(it => it.classList.remove('active'));
                item[count].classList.add('active');

                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = size * count;
            })
        },
        changeImage: function (e) {
            const self = document.querySelector(e);
            if (self == null) return;

            const buttonChange = self.querySelectorAll('.changeImage');
            const mainImage = self.querySelector('.switchImage');

            buttonChange.forEach(btn => btn.addEventListener('click', (e) => {
                const src = e.target.dataset.image;
                mainImage.style.animation = 'fadeInRight 1s ease-out forwards';
                setTimeout(() => {
                    mainImage.style.animation = '';
                }, 1000)
                mainImage.src = src;
            }))

        }
    }
    slider.init();

    const isotope = {
        init: function () {
            this.filter();
        },
        filter: function () {
            let grid = document.querySelector('.grid');
            if (grid === null) return;

            var iso = new Isotope('.grid', {
                itemSelector: '.element-item',
                layoutMode: 'fitRows',
                transitionDuration: 500,
            });

            // filter functions
            var filterFns = {
                // show if number is greater than 50
                numberGreaterThan50: function (itemElem) {
                    var number = itemElem.querySelector('.number').textContent;
                    return parseInt(number, 10) > 50;
                },
                // show if name ends with -ium
                ium: function (itemElem) {
                    var name = itemElem.querySelector('.name').textContent;
                    return name.match(/ium$/);
                }
            };

            // bind filter button click
            var filtersElem = document.querySelector('.filters-button-group');
            filtersElem.addEventListener('click', function (event) {
                // only work with buttons
                if (!matchesSelector(event.target, 'button')) {
                    return;
                }
                var filterValue = event.target.getAttribute('data-filter');
                // use matching filter function
                filterValue = filterFns[filterValue] || filterValue;
                iso.arrange({
                    filter: filterValue
                });
            });

            // change is-checked class on buttons
            var buttonGroups = document.querySelectorAll('.button-group');
            for (var i = 0, len = buttonGroups.length; i < len; i++) {
                var buttonGroup = buttonGroups[i];
                radioButtonGroup(buttonGroup);
            }

            function radioButtonGroup(buttonGroup) {
                buttonGroup.addEventListener('click', function (event) {
                    // only work with buttons
                    if (!matchesSelector(event.target, 'button')) {
                        return;
                    }
                    buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
                    event.target.classList.add('is-checked');
                });
            }
        }
    }
    isotope.init();

    const futuresProduct = {
        init: function () {
            this.changeImage('.clocks');
            this.changeImage('.pen');
            this.changeImage('.dock');
            this.changeImage('.loungeChair');
            this.changeImage('.chair');
            this.changeImage('.light1');
            this.changeImage('.light2');
            this.changeImage('.light3');
            this.changeImage('.light5');

            this.hoverImage('.desk');
            this.hoverImage('.tree');
            this.hoverImage('.drink');
            this.hoverImage('.wood2');
            this.hoverImage('.light');
            this.hoverImage('.voi');
        },
        changeImage: function (e) {
            const self = document.querySelector(e);
            if (self == null) return;

            const btn = self.querySelectorAll('[data-image]');
            const image = self.querySelector('img')

            btn.forEach(item => item.addEventListener('click', (e) => {
                let src = e.target.dataset.image;
                image.src = src;
            }))
        },
        hoverImage: function (e) {
            const self = document.querySelector(e);
            if (self == null) return;

            const btn = self.querySelectorAll('[data-image]');
            const image = self.querySelector('img')

            let src1 = image.src;
            let src2 = btn[0].dataset.image;

            image.addEventListener('mousemove', () => {
                image.src = src2;
            })
            image.addEventListener('mouseleave', () => {
                image.src = src1;
            })
        }
    }
    futuresProduct.init();

    const grabSlider = {
        init: function () {
            this.grabSlide('.product', '.prodcut__item');
            this.grabSlide('.clients', '.client__item');
            this.grabSlide('.layout', 'li');
            this.grabSlide('.featureProduct.singleProduct', '.features__item');

            this.circleBtn('.product');

            this.clickButton('.featureProduct.singleProduct', '.left', '.right', '#wrap', '.features__item');
        },
        grabSlide: function (wrapSlider, itemsSlider) {
            const grabSlide = document.querySelector(wrapSlider);
            if (grabSlide === null) return;

            const wrap = grabSlide.querySelector('#wrap');
            if (wrap === null) return;

            const items = wrap.querySelectorAll(itemsSlider);

            let isDown = false;
            let startX;
            let scrollLeft;
            let size = items[0].offsetWidth;

            function slideItem(){
                index = Math.round(wrap.scrollLeft / size);
                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = size * index;
                optionIndex = index - 1;
            }

            //add event grab wrap
            wrap.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - wrap.offsetLeft; //this value will take x at first
                scrollLeft = wrap.scrollLeft; //this value will take scroll left at first
                wrap.style.scrollBehavior = 'unset';
            })
            wrap.addEventListener('mouseleave', () => {
                isDown = false;
                slideItem();
            })
            wrap.addEventListener('mouseup', () => {
                isDown = false;
                slideItem();
            })
            wrap.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                //transfrom slide by grab and move left right
                const x = e.pageX - wrap.offsetLeft;
                const walk = x - startX;
                wrap.scrollLeft = scrollLeft - walk;
            })
        },
        circleBtn: function (wrapSlider) {
            const grabSlide = document.querySelector(wrapSlider);
            if (grabSlide === null) return;

            const wrap = grabSlide.querySelector('#wrap');
            if (wrap === null) return;

            const items = wrap.querySelectorAll('.prodcut__item');
            const btn = grabSlide.querySelectorAll('.product__control span');

            let size = items[0].offsetWidth;

            btn.forEach(item => item.addEventListener('click', (e) => {
                btn.forEach(i => i.classList.remove('active'));
                e.target.classList.add('active');

                let index = e.target.dataset.slide;

                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = size * index;
            }))
        },
        clickButton:function(selfItem, leftBtn, rightBtn, wrapSlider, itemsSlider){
            const self = document.querySelector(selfItem);
            if (self === null) return;

            const left = self.querySelector(leftBtn);
            const right = self.querySelector(rightBtn);
            const wrap = self.querySelector(wrapSlider);
            const items = self.querySelectorAll(itemsSlider);
            
            if (wrap === null) return;


            let count = 0;
            let size = items[0].offsetWidth;    //slider__item
            let maxScrollLeft = wrap.scrollWidth - wrap.clientWidth;

            left.addEventListener('click', () => {
                if (wrap.scrollLeft <= 0) {
                    wrap.scrollLeft = maxScrollLeft;
                    count = items.length;
                }
                count--;
                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = count * size;
            })

            right.addEventListener('click', () => {
                if (wrap.scrollLeft == maxScrollLeft) count = -1;
                count++;
                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = count * size;
            })
        }
    }
    grabSlider.init();

    const range = {
        init: function () {
            this.rangeValue();
        },
        rangeValue: function () {
            const input = document.querySelector('.product__item input[type="range"]');
            const value = document.querySelector('.product__item #value');

            if (input == null) return;

            input.addEventListener('input', () => {
                let valueInput = input.value;
                value.innerHTML = valueInput + '$';
            })
        }
    }
    range.init();

    const shopProduct = {
        init: function () {
            this.changeImage('.filterProduct .product__item');
            this.hoverImage('.filterProduct .product__item');

            this.sideBar();

            this.changeLayout();
        },
        changeImage: function (e) {
            const self = document.querySelectorAll(e);

            self.forEach(item => {
                const image = item.querySelector('.product__image img');
                const btn = item.querySelectorAll('.color span');

                btn.forEach(button => button.addEventListener('click', e => {
                    const src = e.target.dataset.image;
                    image.src = src;
                }))
            })
        },
        hoverImage:function(e){
            const self = document.querySelectorAll(e);

            self.forEach(item => {
                const image = item.querySelector('.product__image img');
                const imageHover = item.querySelector('.color .image');

                if (imageHover == null) return;
                
                const src1 = image.src;

                item.addEventListener('mousemove', () => {
                    const src = imageHover.dataset.image;
                    image.src = src;
                })
                item.addEventListener('mouseleave', () => {
                    image.src = src1;
                })
            })
        },
        sideBar:function(){
            const open = document.querySelector('.buttonSidebar');
            const close = document.querySelector('.closeFilter');
            const sidebar = document.querySelector('.product__item.filter');

            if (open == null) return;

            open.addEventListener('click', () => {
                sidebar.classList.add('active');
                close.classList.add('active');
            })
            close.addEventListener('click', () => {
                sidebar.classList.remove('active');
                close.classList.remove('active');
            })
        },
        changeLayout:function(){
            const btn = document.querySelectorAll('[data-grid]');
            const main = document.querySelector('.filterProduct');

            if (main == null) return;

            btn.forEach(item => item.addEventListener('click', e => {
                btn.forEach(i => i.classList.remove('active'));
                e.target.classList.add('active');

                const grid = e.target.dataset.grid;
                
                main.className = 'filterProduct';
                main.className = main.className + ' ' + grid;
                main.style.animation = 'fadeInUp 1s ease-out forwards';

                main.addEventListener('animationend', () => {
                    main.style.animation = '';
                })
            }))

            window.addEventListener('resize', (e) => {
                if (window.innerWidth < 991){
                    main.className = 'filterProduct gridRow';
                }
            })
        }
    }
    shopProduct.init();

    const singleProduct = {
        init:function(){
            this.zoom();
            this.tab();
        },
        zoom:function(){
            //Zoom 
            const image = document.querySelector('.signleProduct__content .image');
            if (image == null) return;
            
            image.addEventListener('mousemove', (e) => {
                let x = e.offsetX;  
                let y = e.offsetY;  
                image.style.backgroundSize = "200%";
                image.style.backgroundPosition = `-${x}px -${y}px`;
            })
            image.addEventListener('mouseleave', (e) => {
                image.style.backgroundSize = "100%";
                image.style.backgroundPosition = `center`;
            })
        },
        tab:function(){
            const btnTab = document.querySelectorAll('.singleDes .tabs a');
            const tab = document.querySelectorAll('.singleDes .item')

            btnTab.forEach((item, index) => item.addEventListener('click', (e) => {
                btnTab.forEach(i => i.classList.remove('active'));
                e.target.classList.add('active');
                let id = index;

                tab.forEach(tb => tb.classList.remove('active'));
                tab[id].classList.add('active');

            }))
        }
    }
    singleProduct.init();

    const count = {
        init:function(){
            this.countUp();
        },
        countUp: function () {

            const items = document.querySelectorAll('[data-count]')
            if (items == null) return;
            let counter = 0;

            function countUp(item) {
                item.parentNode.classList.add('active');
                item.innerHTML = counter.toString();    
                counter++;
                if (counter < item.dataset.count) {     
                    setTimeout(function () {
                        countUp(item);
                    }, 20)
                }
            }

            const options = {
                threshold: 1,
                rootMargin: "0px",
            };

            function pre(item) {
                item.classList.add('active');
            };

            const observer = new IntersectionObserver((entries) => {  
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    } else {
                        countUp(entry.target);
                        observer.unobserve(entry.target);
                    }
                })
            }, options);

            items.forEach(item => {
                observer.observe(item);
            })
        }
    }
    count.init();

    const video = {
        init:function(){
            this.openVideo();
        },
        openVideo:function(){
            const self = document.querySelectorAll('.video');
            self.forEach(item => {
                const btn = item.querySelector('.video__overlay');
                const video = item.querySelector('iframe');

                btn.addEventListener('click', () => {
                    const src = btn.dataset.video;
                    video.src = src;
                    video.style.pointerEvents = 'unset';
                })
            })
        }
    }
    video.init();

    const quantity = {
        init: function(){
            this.click();
        },
        click:function(){
            const minus = document.querySelector('.quantityProduct #minus');
            const plus = document.querySelector('.quantityProduct #plus');
            const input = document.querySelector('.quantityProduct input');

            if (input == null) return;

            let value = input.value;

            minus.addEventListener('click', () => {
                if (value <= 1) return;
                value--;
                input.value = value;
            })

            plus.addEventListener('click', () => {
                value++;
                input.value = value;
            })
        }
    }
    quantity.init();

    const productTab = {
        init:function(){
            this.tab('.section1');
            this.tab('.section2');
            this.tab('.section3');
            this.tab('.section4');
            this.tab('.section5');
            this.tab('.section6');

            this.hoverImage('.features__item')
            this.changeImage('.features__item')
        },
        tab:function(e){
            const self = document.querySelector(e);
            if (self == null) return;

            const tabBtns = self.querySelectorAll('.tab__control .tab__item')
            const tabItems = self.querySelectorAll('.tabs .features__grid')

            tabBtns.forEach((item, index) => item.addEventListener('click', () => {
                tabBtns.forEach(i => i.classList.remove('active'));
                tabBtns[index].classList.add('active');

                tabItems.forEach(i => i.classList.remove('active'));
                tabItems[index].classList.add('active');
            }))
        },
        hoverImage:function(e){
            //Hover
            const self = document.querySelectorAll(e);
            
            self.forEach(item => {
                const image = item.querySelector('.features__image img');
                const imageHover = item.querySelector('.color .image');

                if (imageHover == null) return;

                let src1 = image.src;   
                let src2 = imageHover.dataset.image;    

                image.addEventListener('mousemove', () => {
                    image.src = src2;
                })

                image.addEventListener('mouseleave', () => {
                    image.src = src1;
                })
            })
        },
        changeImage:function(e){
            //Click
            const self = document.querySelectorAll(e);

            self.forEach(item => {
                const image = item.querySelector('.features__image img');
                const btn = item.querySelectorAll('.color span');

                if (btn == null) return;

                btn.forEach(button => button.addEventListener('click', e => {
                    let src = e.target.dataset.image; 
                    image.src = src;
                }))
            })
        }
    }
    productTab.init();
}