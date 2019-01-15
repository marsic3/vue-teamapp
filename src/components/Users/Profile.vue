<template>
    <div class="col-md-12 control-section" style="margin:80px; margin-left:330px; padding-right:50px;  width: 1050px">
        <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/lists/ali.png"
          height="200px"
        >
          <v-layout
            column
            fill-height
          >
            <v-card-title>
              <v-btn
                dark
                icon
              >
                <!-- <v-icon>chevron_left</v-icon> -->
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                dark
                icon
                class="mr-3"
              >
                <!-- <v-icon>edit</v-icon> -->
              </v-btn>

              <v-btn
                dark
                icon
              >
                <!-- <v-icon>more_vert</v-icon> -->
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">
                User Profile
              </div>
            </v-card-title>
          </v-layout>
        </v-img>
      
      </v-card>
        <v-card>
            <v-card-title class="headline" primary-title>
                Edit Profile
            </v-card-title>
            <v-card-text>
            <v-form>
                    <v-container>
                        <v-layout row wrap>
    
                            <v-flex xs12 xs6 md6>
                                <v-text-field v-model="firstName" label="First Name" hint="Set user first name" />
                            </v-flex>

                            <v-flex xs12 xs6 md6>
                                <v-text-field v-model="lastName" label="Last Name" hint="Set user last name" />
                            </v-flex>
                            
                            <v-flex xs12 xs6 md6>
                                <v-text-field v-model="userEmail" label="User Email" hint="Set user email" />
                            </v-flex>

                            <v-flex xs12 xs6 md6>
                                <v-text-field v-model="position" label="Position" hint="Set user position" />
                            </v-flex>    
                            <!-- <v-flex xs12 xs6 md1 /> -->
    
                            <v-flex xs12 sm6 md12>
                                <v-text-field v-model="password" :append-icon="showPassword ? 'visibility_off' : 'visibility'" :type="showPassword ? 'text' : 'password'" label="New Password" hint="Please choose a complex one.." :error="error" @click:append="showPassword = !showPassword"
                                />
                            </v-flex>
    
                            <v-flex xs12 sm6 md1 />
    
                            <v-flex xs12 sm6 md12>
                                <v-text-field v-model="passwordConfirm" :append-icon="showPasswordConfirm ? 'visibility_off' : 'visibility'" :type="showPasswordConfirm ? 'text' : 'password'" label="Confirm New Password" hint="and confirm it." :error="error" @click:append="showPasswordConfirm = !showPasswordConfirm"
                                />
                            </v-flex>
                            <!-- <v-flex xs12>
                          <v-btn raised class="primary" @click="onPickFile">Upload image</v-btn>
                           <input type="file" ref="fileInput" style="display:none" accept="image/*" @change="onFilePicked">
                        </v-flex> -->
                        </v-layout>
                    </v-container>
                </v-form>
            <!-- </v-card-text>
            <v-card-text xs6 > -->
                Choose your color ?
                <swatches 
                inline swatch-size='56' 
                v-model="color"  
                :colors="colors"
                row-length="6"
                popover-to="left"
                :exceptions="['#FFFFFF']" 
                shapes="squares" 
                show-border ></swatches>
            </v-card-text>
    
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="setUpSettings">
                    Save Changes
                </v-btn>
            </v-card-actions>
            
            
        </v-card>
    </div>
</template>

<script>
import * as firebase from 'firebase'

    export default {
        data() {
            return {
                color: '#F64272',
                colors: ['#F64272','#FF0000	', '#000080', '#1E90FF','#7B68EE','#008080',  '#00FF00', '#FFD700','#8B4513','#FF8C00','#708090','#4B0082','#20B2AA'],
                rating: null,
                dialog: false,
                dialogSettings: false,
                switchEmailNotification: true,
                showPassword: null,
                showPasswordConfirm: null,
                userEmail: this.$store.getters.loadUser.email,
                firstName: this.$store.getters.loadUser.firstName,
                lastName: this.$store.getters.loadUser.lastName,
                position: this.$store.getters.loadUser.position,
                password: null,
                passwordConfirm: null,
                error: false,
                showResult: false,
                result: '',
                key: this.$store.getters.loadUser.key,
                items: [{
                        icon: 'account_circle',
                        href: '#',
                        title: 'Profile',
                        click: (e) => {}
                    },
                    {
                        icon: 'settings',
                        href: '#',
                        title: 'Settings',
                        click: () => {
                            const vm = this;
    
                            vm.dialogSettings = true;
                        }
                    },
                    {
                        icon: 'exit_to_app',
                        href: '#',
                        title: 'Log Out',
                        click: () => {
                            const vm = this;
    
                            vm.$router.push({
                                name: 'Login'
                            });
                        }
                    }
                ]
            }
        },
        
        methods: {
            onPickFile(){
                this.$refs.fileInput.click()
            },
            onFilePicked(event){
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0) {
                return alert('Please add a valid file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
            },
            toggleNavigationBar() {
                const vm = this;
    
                vm.$emit('toggleNavigationBar');
            },
    
            setUpSettings() {
                const vm = this;
                const payload = {
                key: this.key,
                email: this.userEmail,
                firstName: this.firstName,
                lastName: this.lastName,
                position: this.position,
                createdAt: new Date(),
                color: this.color

                }
                if (vm.userEmail === '' || vm.firstName === '' || vm.lastName === '' || vm.position === '') {
                    vm.result = "Fields can't be null.";
                    vm.showResult = true;
                    return;
                }
                this.$store.dispatch('updateEmployeeData',payload)
                console.log(this.color)
                console.log(this.$store.getters.user)

                if (vm.password === null || vm.passwordConfirm === null) {
                    vm.result = "Email and Password can't be null.";
                    vm.showResult = true;
                    return;
                }
                if (vm.password !== vm.passwordConfirm) {
                    vm.error = true;
                    vm.result = "Passwords does not match the confirm password.";
                    vm.showResult = true;
                    return;
                }
                // vm.$root.userEmail = vm.userEmail;
                // vm.$root.userPassword = vm.password;
                // vm.result = "Email and password changed succesfully.";
                // vm.showResult = true;
                // vm.dialogSettings = false;

               
                this.$store.dispatch('updatePassword',vm.password)



            }
        },
        computed: {
            loadUser(){
                return this.$store.getters.loadUser
      },
        }
    };
</script>
