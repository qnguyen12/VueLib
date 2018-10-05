Vue.component("currency-input", {
            template: `
                    <div class="input-group">
                        <div class= "input-group-addon"> $</div>
                        <input type="text" class="form-control" @@blur="onBlur" v-model="displayValue" @@keydown="isNumber" @@focus="selectAll" v-bind:tabindex="tabindex" v-bind:disabled="disabled">
                    </div>`,
            props: ["value", "tabindex", "disabled"],
            data: function () {
                return {
                    isInputActive: false
                }
            },
            computed: {
                displayValue: {
                    get: function () {                        
                        if (typeof (this.value) === "number") {                             
                            if (!this.isInputActive) {
                                //format display
                                return this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                            } 
                            //format while typing
                            var components = this.value.toString().split(".");
                            components[0] = components[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            return components.join(".");
                        }
                        return this.value;
                    },
                    set: function (modifiedValue) {
                        var newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
                        // Ensure that it is not NaN
                        if (isNaN(newValue)) {
                            newValue = 0;
                        }
                        this.$emit("input", newValue);
                    }
                }
            },
            methods: {  
                isNumber: function(evt) {
                        // https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
                    var keyCode = (evt.which) ? evt.which : event.keyCode;
                    // Ctrl + a, c, v
                    if (evt.ctrlKey && ([65, 67, 86].indexOf(keyCode) != -1))
                        return true;
                    // Left & Right Arrow
                    if ([37, 39].indexOf(keyCode) != -1)
                        return true;
                    // Top Number Key
                    if (keyCode >= 48 && keyCode <= 57)
                        return true;
                    // Numpad Number Key
                    if (keyCode >= 96 && keyCode <= 105)
                        return true;
                    // Backspace, Delete, and Tab
                    if (keyCode == 8 || keyCode == 9 || keyCode == 46)
                        return true;
                    // Dot, and Check if there is Dot
                    if ((keyCode == 110 || keyCode == 190) && (this.displayValue + "").indexOf(".") == -1)
                        return true;
                    evt.preventDefault();
                    return false;
                    },
                onBlur: function () {
                    this.isInputActive = false;
                    this.$emit('blur');
                },
                selectAll: function (event) {
                    this.isInputActive = true;
                    // Workaround for Safari bug
                    // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
                    setTimeout(function () {
                        event.target.select()
                    }, 0)
                }
            }
        });