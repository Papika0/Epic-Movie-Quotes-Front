<template>
    <LayoutModal @close="modalStore.toggleLoginModal">
        <template v-slot:header>
            <h2 class="text-white text-3xl font-bold">Log in to your account</h2>
            <h3 class="text-placeholder">Welcome back! Please enter your details.</h3>
        </template>

        <template v-slot:body>
            <Form class="flex flex-col gap-4 w-full" @submit="logIn">
                <InputField name="email" label="Email" placeholder="Enter your email" :apiError="Boolean(emailError)" />
                <p v-if="emailError" class="text-red-star text-sm"> {{ emailError }} </p>
                <InputField name="password" label="Password" placeholder="password" textType="password" />
                <div class="flex flex-row justify-between">
                    <div class="items-center flex">
                        <Field name="remember_me" type="checkbox" class="mr-2 h-4 w-4 rounded-md" value="true" />
                        <label for="remember_me" class="text-white">Remember me</label>
                    </div>
                    <span class="text-my-blue cursor-pointer underline" @click="switchLoginForgotPasswordModal()">Forgot
                        password?</span>
                </div>
                <ButtoneRed text="Sign in" type="submit" />
                <ButtonDark text="Sign in with Google" :gmail="true" @click="googleSignIn()" />
            </Form>
        </template>
        <template v-slot:footer>
            <div class="flex gap-1 mx-auto">
                <p class="text-placeholder">Don't have an account?</p>
                <span class="underline text-my-blue cursor-pointer" @click="modalStore.switchLoginRegisterModal">Sign
                    up</span>
            </div>
        </template>
    </LayoutModal>
</template>


<script setup>
import LayoutModal from '@/components/layouts/LayoutModal.vue';
import { Form, Field } from 'vee-validate';
import { ref, computed } from 'vue';
import { useModalStore } from '@/stores/useModalStore.js';
import { useAuthStore } from '@/stores/useAuthStore.js';
import InputField from '@/components/ui/InputField.vue';
import ButtoneRed from '@/components/ui/ButtonRed.vue';
import ButtonDark from '@/components/ui/ButtonDark.vue';
import { login } from '@/services/auth/auth.js';
import api from '@/plugins/axios/index.js';
import sanctum from '@/plugins/axios/sanctum';
import router from '@/router/index.js';

const modalStore = useModalStore();

const apiErrors = ref(null);

const emailError = computed(() => {
    return apiErrors.value;
});

async function googleSignIn() {
    await sanctum.get('/sanctum/csrf-cookie').then(() => {
        api.get('/auth/google').then(response => {
            window.location.href = response.data.url;
        }).catch(error => {
            console.log(error);
        });
    });
}

function switchLoginForgotPasswordModal() {
    modalStore.toggleLoginModal();
    modalStore.toggleEmailForgotPasswordModal();
}

async function logIn(values) {
    apiErrors.value = null;
    await sanctum.get('/sanctum/csrf-cookie').then(() => {
        login(values.email, values.password).then(() => {
            modalStore.toggleLoginModal();
            useAuthStore().checkAuth().then(() => {
                router.push({ name: 'profile' });
            });
        }).catch(error => {
            if (error.response.status == 403) {
                modalStore.toggleLoginModal();
                modalStore.toggleEmailSentModal();
            }
            else {
                apiErrors.value = error.response.data.message;
            }
        });
    });
}

</script>