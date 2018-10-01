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
                isNumber: function (evt) {
                    evt = (evt) ? evt : window.event;
                    var charCode = (evt.which) ? evt.which : evt.keyCode;
                    if ((charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && charCode !== 46 && charCode !== 8 && charCode !== 9 && charCode !== 110)
                        evt.preventDefault();
                     else 
                        return true;                    
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