const { createApp } = Vue;

createApp({
    data: function() {
        return {
            products: [],
            cart: [],
            isLoading: false,
            isCartOpen: false,
            searchKeyword: '',
            pendingAction: null,
            dialogTitle: '確認操作',
            dialogMessage: '',
            notificationMessage: '',
            notificationVisible: false,
            notificationTimeout: null
        };
    },
    computed: {
        filteredProducts: function() {
            var keyword = this.searchKeyword.trim().toLowerCase();
            return this.products.filter(function(product) {
                return product.name.toLowerCase().indexOf(keyword) !== -1;
            });
        },
        cartTotalQuantity: function() {
            return this.cart.reduce(function(total, item) {
                return total + item.quantity;
            }, 0);
        },
        cartTotal: function() {
            return this.cart.reduce(function(total, item) {
                return total + (item.product.price * item.quantity);
            }, 0);
        }
    },
    mounted: function() {
        this.loadProducts();
    },
    methods: {
        loadProducts: function() {
            var self = this;
            self.isLoading = true;

            setTimeout(function() {
                self.products = [
                    { id: 1, name: '無線藍牙耳機', price: 2999, image: 'earphones.jpg' },
                    { id: 2, name: '智慧手錶', price: 8999, image: 'smartwatch.jpg' },
                    { id: 3, name: '便攜式充電器', price: 1299, image: 'powerbank.jpg' },
                    { id: 4, name: '無線滑鼠', price: 899, image: 'mouse.jpg' },
                    { id: 5, name: '機械鍵盤', price: 3999, image: 'keyboard.jpg' },
                    { id: 6, name: '網路攝影機', price: 2199, image: 'webcam.jpg' },
                    { id: 7, name: 'USB隨身碟', price: 599, image: 'usb.jpg' },
                    { id: 8, name: '桌面擴音器', price: 1599, image: 'speaker.jpg' }
                ];
                self.isLoading = false;
            }, 1500);
        },
        addToCart: function(product) {
            var item = this.findCartItem(product.id);
            if (item) {
                item.quantity += 1;
            } else {
                this.cart.push({ product: product, quantity: 1 });
            }
            this.showNotification('「' + product.name + '」已加入購物車');
        },
        findCartItem: function(productId) {
            return this.cart.find(function(item) {
                return item.product.id === productId;
            });
        },
        updateQuantity: function(productId, change) {
            var item = this.findCartItem(productId);
            var nextQuantity;
            if (!item) return;

            nextQuantity = item.quantity + Number(change);
            if (nextQuantity <= 0) {
                this.removeFromCart(productId);
                return;
            }
            item.quantity = nextQuantity;
        },
        setQuantity: function(productId, quantity) {
            var item = this.findCartItem(productId);
            var nextQuantity = Number(quantity);
            if (!item) return;

            if (!Number.isInteger(nextQuantity) || nextQuantity < 1) {
                this.removeFromCart(productId);
                return;
            }
            item.quantity = nextQuantity;
        },
        removeFromCart: function(productId) {
            var item = this.findCartItem(productId);
            if (!item) return;

            this.openConfirmationDialog(
                'remove',
                productId,
                '移除商品',
                '確定要將「' + item.product.name + '」從購物車移除嗎？'
            );
        },
        removeCartItem: function(productId) {
            this.cart = this.cart.filter(function(item) {
                return item.product.id !== productId;
            });
        },
        toggleCart: function() {
            this.isCartOpen = !this.isCartOpen;
        },
        checkout: function() {
            if (!this.cart.length) {
                this.showNotification('購物車是空的！');
                return;
            }

            this.openConfirmationDialog('checkout', null, '確認結帳', '確定要結帳目前購物車內的商品嗎？');
        },
        completeCheckout: function() {
            var self = this;
            self.showNotification('正在處理結帳...');
            setTimeout(function() {
                self.cart = [];
                self.isCartOpen = false;
                self.showNotification('結帳成功！感謝您的購買。');
            }, 2000);
        },
        openConfirmationDialog: function(type, productId, title, message) {
            var self = this;
            self.pendingAction = { type: type, productId: productId };
            self.dialogTitle = title;
            self.dialogMessage = message;
            self.$nextTick(function() {
                self.$refs.dialogConfirmButton.focus();
            });
        },
        closeConfirmationDialog: function() {
            this.pendingAction = null;
        },
        confirmDialogAction: function() {
            var action = this.pendingAction;
            if (!action) return;

            this.pendingAction = null;
            if (action.type === 'remove') {
                this.removeCartItem(action.productId);
                this.showNotification('商品已從購物車移除');
            }
            if (action.type === 'checkout') {
                this.completeCheckout();
            }
        },
        showNotification: function(message) {
            var self = this;
            self.notificationMessage = message;
            self.notificationVisible = true;
            clearTimeout(self.notificationTimeout);
            self.notificationTimeout = setTimeout(function() {
                self.notificationVisible = false;
            }, 3000);
        },
        handleDocumentClick: function(event) {
            var eventPath = typeof event.composedPath === 'function' ? event.composedPath() : [];
            var clickedInOverlay = eventPath.some(function(element) {
                return element && element.classList &&
                    (element.classList.contains('cart-sidebar') ||
                     element.classList.contains('cart-icon') ||
                     element.classList.contains('dialog-overlay'));
            });

            if (!eventPath.length && event.target.closest) {
                clickedInOverlay = Boolean(event.target.closest('.cart-sidebar, .cart-icon, .dialog-overlay'));
            }

            if (!clickedInOverlay) {
                this.isCartOpen = false;
            }
        }
    }
}).mount('#app');
