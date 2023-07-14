<template>
    <LayoutFeed>
        <IconBackArrow class="my-auto absolute ml-8 mt-3 lg:hidden" @click="goBack" />
        <p class="text-white text-2xl ml-550 mb-32 hidden lg:block">{{ $t('profile.my_profile') }}</p>
        <div class="mx-auto max-w-5xl">
            <div
                class="absolute w-44 h-50 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 lg:flex flex-col gap-2 hidden">
                <img :src="profileImageUrl" class="rounded-full w-44 h-44" />
                <button class="text-white text-xl" @click="$refs.fileInputRef.click()">{{ $t('profile.upload_new_photo')
                }}</button>
                <input type="file" @change="handleFileUpload" ref="fileInputRef" class="hidden" />
            </div>
            <Form @submit="handleSaveChanges">
                <InputProfileMobile v-if="editUsername && (windowWidth < 800)" :label="$t('profile.new_username')"
                    name="username" :placeholder="$t('profile.enter_new_username')" :apiError="usernameError"
                    :hasError="Boolean(usernameError)" rules="required|min:3|max:15|lowercase"
                    :cancelEdit="() => { editUsername = false }" />

                <InputProfileMobile v-if="editEmail && (windowWidth < 800)" :label="$t('profile.new_email')" name="email"
                    :placeholder="$t('profile.enter_new_email')" :apiError="emailError" :hasError="Boolean(emailError)"
                    rules="required|email" :cancelEdit="() => { editEmail = false }" />

                <InputProfileMobile v-if="editPassword && (windowWidth < 800)" :label="$t('profile.new_password')"
                    name="password" type="password" :placeholder="$t('profile.enter_new_password')"
                    rules="required|min:8|max:15|lowercase" :cancelEdit="() => { editPassword = false }" />

                <ConfirmProfileEditModal v-if="useModalStore().showProfileModal"
                    @close="useModalStore().toggleProfileModal()" />
                <div class="mx-auto justify-center lg:bg-dark-blue bg-zinc-800 max-w-screen-md lg:max-w-5xl" v-if="hideDiv">
                    <div class="lg:pt-48 mt-16 pt-0 lg:mt-0 pb-36 flex flex-col gap-10 max-w-xl mx-auto mb-4 lg:mb-0">
                        <div class="w-44 h-50 flex flex-col gap-2 mx-auto lg:hidden mt-5">
                            <img :src="profileImageUrl" class="rounded-full w-44 h-44" />
                            <button type="button" class="text-white text-xl" @click="$refs.fileInputRef.click()">{{
                                $t('profile.upload_new_photo')
                            }}</button>
                            <input type="file" @change="handleFileUpload" ref="fileInputRef" class="hidden" />
                        </div>
                        <InputProfile :label="$t('profile.username')" :value="user?.username ?? ''" name="current_username"
                            @edit="editUsername = !editUsername" :editable="true" />

                        <div v-if="editUsername && (windowWidth > 800)" class="lg:block hidden">
                            <InputField :label="$t('profile.new_username')" name="username"
                                :placeholder="$t('profile.enter_new_username')" :apiError="Boolean(usernameError)"
                                rules="required|min:3|max:15|lowercase" class=" w-5/6" />
                            <p v-if="usernameError" class="text-red-star text-sm pt-5"> {{ usernameError }} </p>
                        </div>

                        <InputProfile :label="$t('auth.email')" :value="user?.email ?? ''" name="current_email"
                            @edit="editEmail = !editEmail" :editable="user?.google_id == null" />

                        <div v-if="editEmail && (windowWidth > 800)" class="lg:block hidden">
                            <InputField :label="$t('profile.new_email')" name="email"
                                :placeholder="$t('profile.enter_new_email')" type="email" :apiError="Boolean(emailError)"
                                rules="required|email" class="w-5/6" />
                            <p v-if="emailError" class="text-red-star text-sm pt-5"> {{ emailError }} </p>
                        </div>

                        <div v-if="user?.google_id == null">
                            <InputProfile :label="$t('auth.password')" value="********" name="current_password"
                                textType="password" @edit="editPassword = !editPassword" :editable="true" />

                            <div v-if="editPassword && (windowWidth > 800)" class="lg:block hidden">
                                <div class="w-5/6 border border-password-div flex flex-col gap-4 pl-6 mb-10 mt-10">
                                    <p class="text-white mt-6">{{ $t('profile.password_should_contain') }}:</p>
                                    <div class="flex flex-col gap-1 mb-6">
                                        <p class="text-sm text-light-gray">• {{ $t('profile.8_or_more_characters') }} </p>
                                        <p class="text-white text-sm">• {{ $t('profile.15_lowercase_letters') }}</p>
                                    </div>
                                </div>

                                <InputField :label="$t('profile.new_password')" name="password"
                                    :placeholder="$t('profile.enter_new_password')" textType="password" class=" w-5/6 mb-10"
                                    rules="required|min:8|max:15|lowercase" />
                                <InputField :label="$t('auth.confirm_password')" name="confirm_password"
                                    :placeholder="$t('profile.confirm_new_password')" textType="password" class=" w-5/6"
                                    rules="required|confirmed:@password" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="float-right lg:flex flex-row gap-7 my-16 hidden"
                    v-if="(editEmail || editPassword || editUsername) && (windowWidth > 800)">
                    <p class="text-light-cyan text-xl my-auto cursor-pointer" @click="closeEdit()">{{ $t('profile.cancel')
                    }}</p>
                    <ButtonRed :text="$t('profile.save_changes')" type="submit" />
                </div>
            </Form>

        </div>

        <div :class="{
            'absolute lg:w-96 w-11/12 flex flex-row justify-between bg-pop-up p-4 right-0 lg:bottom-0 top-0 lg:top-auto mt-32 lg:mt-0 mb-5 mr-4 rounded': true,
            'hidden': !showPopup
        }">
            <div class="flex flex-row gap-2 ">
                <IconChangeSuccess />
                <p class="text-dark-green">{{ $t('profile.changes_updated_successfully') }}</p>
            </div>
            <IconClosePopUp class="my-auto cursor-pointer" @click="closePopup" />
        </div>

    </LayoutFeed>
</template>
  
<script setup>
import { ref, computed, watch } from 'vue';
import ConfirmProfileEditModal from '@/components/modals/ConfirmProfileEditModal.vue';
import InputProfileMobile from '@/components/ui/InputProfileMobile.vue';
import { Form } from 'vee-validate';
import LayoutFeed from '@/components/layouts/LayoutFeed.vue';
import IconBackArrow from '@/components/icons/header/IconBackArrow.vue';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import InputProfile from '@/components/ui/InputProfile.vue';
import InputField from '@/components/ui/InputField.vue';
import IconChangeSuccess from '@/components/icons/profile/IconChangeSuccess.vue';
import IconClosePopUp from '@/components/icons/profile/IconClosePopUp.vue';
import api from '@/plugins/axios/index.js';
import { updateProfile } from '@/services/auth/auth.js';
import { useUserStore } from '@/stores/useUserStore.js';
import { useModalStore } from '@/stores/useModalStore.js';

const fileInputRef = ref(null);

const editEmail = ref(false);

const editPassword = ref(false);

const editUsername = ref(false);

const showPopup = ref(false);

const apiErrors = ref(null);

const goBack = () => {
    window.history.back();
};

const windowWidth = ref(window.innerWidth);

const closePopup = () => {
    showPopup.value = false;
};

const hideDiv = computed(() => {
    if (windowWidth.value > 800) {
        return true;
    }
    if (editEmail.value || editPassword.value || editUsername.value) {
        return false;
    } else {
        return true;
    }
});

const emailError = computed(() => {
    if (apiErrors.value?.email) {
        return apiErrors.value.email[0];
    } return null;
});

const usernameError = computed(() => {
    if (apiErrors.value?.username) {
        return apiErrors.value.username[0];
    } return null;
});

const profileImageUrl = computed(() => {
    const thumbnail = useUserStore().user?.thumbnail;
    if (thumbnail) {
        return import.meta.env.VITE_API_AUTH_URL + thumbnail;
    }
    return null;
});

const user = computed(() => {
    return useUserStore().user;
});


function handleSaveChanges(values) {
    if (windowWidth.value < 800 && (useModalStore().showProfileModal === false)) {
        useModalStore().toggleProfileModal();
        return;
    }
    else {
        updateProfile(values.username, values.email, values.password)
            .then((response) => {
                useUserStore().setUser(response.data.user);
                closeEdit();
                showPopup.value = true;
                setTimeout(() => {
                    showPopup.value = false;
                }, 15000);
                if (useModalStore().showProfileModal) {
                    useModalStore().toggleProfileModal();
                }
            })
            .catch((error) => {
                apiErrors.value = error.response.data.errors;
            });
    }
}

function handleFileUpload() {
    const fileInput = fileInputRef.value;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        return;
    }
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('thumbnail', file);

    api
        .post('/profile/upload-thumbnail', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            useUserStore().setUser(res.data.user);
            showPopup.value = true;
            setTimeout(() => {
                showPopup.value = false;
            }, 15000);
        })
}

function closeEdit() {
    editEmail.value = false;
    editPassword.value = false;
    editUsername.value = false;
}

</script>
  