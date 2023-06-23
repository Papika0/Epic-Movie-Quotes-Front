<template>
    <LayoutFeed>
        <p class="text-white text-2xl ml-550 mb-32">My profile</p>
        <div class="mx-auto max-w-5xl">
            <div class="absolute w-44 h-50 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
                <img :src="profileImageUrl" class="rounded-full w-44 h-44" />
                <button class="text-white text-xl" @click="$refs.fileInputRef.click()">Upload new photo</button>
                <input type="file" @change="handleFileUpload" ref="fileInputRef" class="hidden" />
            </div>
            <Form @submit="handleSaveChanges">
                <div class="mx-auto justify-center bg-dark-blue max-w-5xl">
                    <div class="pt-48 pb-36 flex flex-col  gap-10 max-w-xl mx-auto">
                        <InputProfile label="Username" :value="user?.username ?? ''" name="current_username"
                            @edit="editUsername = !editUsername" :editable="true" />

                        <div v-if="editUsername">
                            <InputField label="New Username" name="username" placeholder="Enter new Username"
                                :apiError="Boolean(usernameError)" rules="required|min:3|max:15|lowercase" class=" w-5/6" />
                            <p v-if="usernameError" class="text-red-star text-sm pt-5"> {{ usernameError }} </p>
                        </div>

                        <InputProfile label="Email" :value="user?.email ?? ''" name="current_email"
                            @edit="editEmail = !editEmail" :editable="user?.google_id == null" />

                        <div v-if="editEmail">
                            <InputField label="New email" name="email" placeholder="Enter new email" type="email"
                                :apiError="Boolean(emailError)" rules="required|email" class="w-5/6" />
                            <p v-if="emailError" class="text-red-star text-sm pt-5"> {{ emailError }} </p>
                        </div>

                        <div v-if="user?.google_id == null">
                            <InputProfile label="password" value="password" name="current_password" textType="password"
                                @edit="editPassword = !editPassword" :editable="true" />

                            <div v-if="editPassword">
                                <div class="w-5/6 border border-password-div flex flex-col gap-4 pl-6 mb-10 mt-10">
                                    <p class="text-white mt-6">Passwords should contain:</p>
                                    <div class="flex flex-col gap-1 mb-6">
                                        <p class="text-sm text-light-gray">• 8 or more characters </p>
                                        <p class="text-white text-sm">• 15 lowercase character</p>
                                    </div>
                                </div>

                                <InputField label="New password" name="password" placeholder="Enter new password"
                                    textType="password" class=" w-5/6 mb-10" rules="required|min:8|max:15|lowercase" />
                                <InputField label="Confirm password" name="confirm_password"
                                    placeholder="Confirm new password" textType="password" class=" w-5/6"
                                    rules="required|confirmed:@password" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="float-right flex flex-row gap-7 my-16" v-if="editEmail || editPassword || editUsername">
                    <p class="text-light-cyan text-xl my-auto cursor-pointer" @click="closeEdit()">Cancel</p>
                    <ButtonRed text="Save changes" type="submit" />
                </div>
            </Form>

        </div>

        <div :class="{
            'absolute w-96 flex flex-row justify-between bg-pop-up p-4 right-0 bottom-0 mb-5 mr-4': true,
            'hidden': !showPopup
        }">
            <div class="flex flex-row gap-2 ">
                <IconChangeSuccess />
                <p class="text-dark-green">Changes updated succsessfully</p>
            </div>
            <IconClosePopUp class="my-auto cursor-pointer" @click="closePopup" />
        </div>

    </LayoutFeed>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { Form } from 'vee-validate';
import LayoutFeed from '@/components/layouts/LayoutFeed.vue';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import InputProfile from '@/components/ui/InputProfile.vue';
import InputField from '@/components/ui/InputField.vue';
import IconChangeSuccess from '@/components/icons/profile/IconChangeSuccess.vue';
import IconClosePopUp from '@/components/icons/profile/IconClosePopUp.vue';
import api from '@/plugins/axios/index.js';
import { updateProfile } from '@/services/auth/auth.js';
import { useUserStore } from '@/stores/useUserStore.js';

const fileInputRef = ref(null);

const editEmail = ref(false);

const editPassword = ref(false);

const editUsername = ref(false);

const showPopup = ref(false);

const apiErrors = ref(null);

const closePopup = () => {
    showPopup.value = false;
};

const emailError = computed(() => {
    if (apiErrors.value?.email) {
        return apiErrors.value.email[0];
    }
});

const usernameError = computed(() => {
    if (apiErrors.value?.username) {
        return apiErrors.value.username[0];
    }
});

const profileImageUrl = computed(() => {
    const thumbnail = useUserStore().user?.thumbnail;
    if (thumbnail) {
        return `${import.meta.env.VITE_API_AUTH_URL}/storage/${thumbnail}`;
    }
    return null;
});

const user = computed(() => {
    return useUserStore().user;
});

function handleSaveChanges(values) {
    updateProfile(values.username, values.email, values.password)
        .then((response) => {
            useUserStore().setUser(response.data.user);
            closeEdit();
            showPopup.value = true;
            setTimeout(() => {
                showPopup.value = false;
            }, 15000);
        })
        .catch((error) => {
            apiErrors.value = error.response.data.errors;
        });
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
        .then(() => {
            window.location.reload();
        })
}

function closeEdit() {
    editEmail.value = false;
    editPassword.value = false;
    editUsername.value = false;
}

</script>
  