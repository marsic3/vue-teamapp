<template>
    <v-container fluid grid-list-md >
        <v-layout row wrap>
            <v-flex xs12 sm6 lg12 >
                <div class="col-md-12 control-section">
                    <!-- <v-card>
                        <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="200px">
                            <v-layout column fill-height>
                                <v-spacer></v-spacer>
                                <v-card-title class="white--text pl-5 pt-5">
                                    <div class="display-1 pl-5 pt-5">
                                        User Profile
                                    </div>
                                </v-card-title>
                                <v-layout row v-if="error">
                                <v-flex xs12 sm12>
                                    <app-alert @dismissed="onDismissed" :text="error"></app-alert>
                                </v-flex>
                            </v-layout>
                            <v-layout row v-if="success">
                                <v-flex xs12 sm12>
                                    <app-alert-success @dismissed="onDismissed" :text="success"></app-alert-success>
                                </v-flex>
                            </v-layout>
                            </v-layout>
                        </v-img>
                    </v-card> -->
                    <v-tabs color="primary" dark slider-color="primary">
                        <v-tab ripple>
                            Edit Profile
                        </v-tab>
                        <v-tab ripple>
                            Edit Account
                        </v-tab>
                        <v-tab-item>
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
                                    <swatches inline swatch-size='45' v-model="color" :colors="colors" row-length="6" popover-to="left" :exceptions="['#FFFFFF']" shapes="squares" show-border></swatches>
                                     <v-flex d-flex lg12 xs12 sm6 class="py-2">

            <v-btn-toggle v-model="toggle_one" mandatory style="box-shadow: none;">
                <v-btn fab outline color="white">
                  <v-avatar>
                    <img src="https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban">
                   </v-avatar>
                </v-btn>
                <v-btn fab outline color="white" >
                  <v-avatar>
                    <img src="https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun">
                   </v-avatar>
                </v-btn>
                <v-btn fab outline color="white" >
                   <v-avatar>
                    <img src='https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Hearts&eyebrowType=RaisedExcitedNatural&mouthType=Eating&skinColor=Brown'>
                   </v-avatar>
                </v-btn>
                <v-btn fab outline color="white" >
                  <v-avatar>
                    <img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Prescription01&hairColor=SilverGray&facialHairType=Blank&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Blue01&eyeType=Hearts&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Black">
                   </v-avatar>
                </v-btn>
                <v-btn fab outline color="white" >
                  <v-avatar>
                    <img src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Sunglasses&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Platinum&clotheType=Overall&clotheColor=Gray01&eyeType=Wink&eyebrowType=UnibrowNatural&mouthType=Default&skinColor=Yellow">
                   </v-avatar>
                </v-btn>
                <v-btn fab outline color="white" >
                  <v-avatar>
                    <img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=CollarSweater&clotheColor=Blue03&eyeType=WinkWacky&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=DarkBrown">
                   </v-avatar>
                </v-btn>
                <v-btn fab outline color="white" >
                  <v-avatar>
                    <img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Blank&hairColor=Red&facialHairType=Blank&facialHairColor=BrownDark&clotheType=CollarSweater&clotheColor=Blue03&eyeType=Default&eyebrowType=UpDown&mouthType=Twinkle&skinColor=Tanned">
                   </v-avatar>
                </v-btn>
             </v-btn-toggle>
              </v-flex>    
                                </v-card-text>
                                
    
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" flat @click="setUpSettings">
                                        Save Changes
                                    </v-btn>
                                </v-card-actions>
    
    
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card>
                                <v-card-title class="headline" primary-title>
                                    Edit Account
                                </v-card-title>
                                <v-card-text>
                                    <v-form>
                                        <v-container>
                                            <v-layout row wrap>
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
                                </v-card-text>
    
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" flat @click="setUpSettings">
                                        Save Changes
                                    </v-btn>
                                </v-card-actions>
    
    
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
    
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import * as firebase from 'firebase'
    
    export default {
        data() {
            return {
                toggle_one: 0,
                avatars : [
  'https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
  'https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
  'https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Hearts&eyebrowType=RaisedExcitedNatural&mouthType=Eating&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Prescription01&hairColor=SilverGray&facialHairType=Blank&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Blue01&eyeType=Hearts&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Black',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Sunglasses&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Platinum&clotheType=Overall&clotheColor=Gray01&eyeType=Wink&eyebrowType=UnibrowNatural&mouthType=Default&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=CollarSweater&clotheColor=Blue03&eyeType=WinkWacky&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Blank&hairColor=Red&facialHairType=Blank&facialHairColor=BrownDark&clotheType=CollarSweater&clotheColor=Blue03&eyeType=Default&eyebrowType=UpDown&mouthType=Twinkle&skinColor=Tanned'
],
                color: '#D81B60',
                colors: ['#D81B60', '#8E24AA', '#5E35B1', '#3949AB', '#1E88E5', '#039BE5', '#00ACC1', '#00897B', '#43A047', '#7CB342', '#C0CA33', '#FFEE58', '#FFA726', '#FF7043', '#8D6E63', '#78909C', '#757575', '#000000'],
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
                error: null,
                success: null,
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
            onPickFile() {
                this.$refs.fileInput.click()
            },
            onFilePicked(event) {
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
                    color: this.color,
                    avatar: this.avatars[this.toggle_one]
    
                }
                if (vm.userEmail === '' || vm.firstName === '' || vm.lastName === '' || vm.position === '') {
                    vm.result = "Fields can't be null."
                    this.error = "Fields can't be empty."
                    vm.showResult = true;
                    return;
                }
                this.$store.dispatch('updateEmployeeData', payload)
                this.success = 'You have been successefuly updated your profile'
                console.log(this.color)
                console.log(this.$store.getters.user)
    
                if (vm.password === null || vm.passwordConfirm === null) {
                    vm.result = "Email and Password can't be null."
                    vm.showResult = true
                    return
                }
                if (vm.password !== vm.passwordConfirm) {
                    vm.error = true
                    vm.result = "Passwords does not match the confirm password."
                    this.error = "Passwords does not match the confirm password."
                    vm.showResult = true
                    return
                }
                // vm.$root.userEmail = vm.userEmail;
                // vm.$root.userPassword = vm.password;
                // vm.result = "Email and password changed succesfully.";
                // vm.showResult = true;
                // vm.dialogSettings = false;
    
                this.success = 'You have been successefuly updated your password'
                this.$store.dispatch('updatePassword', vm.password)
    
    
    
            },
            onDismissed() {
                this.$store.dispatch('clearError')
            },
        },
        computed: {
            loadUser() {
                return this.$store.getters.loadUser
            },
        }
    };
</script>
