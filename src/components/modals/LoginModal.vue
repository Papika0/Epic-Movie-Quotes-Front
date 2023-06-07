<template>
    <LayoutModal @close="modalStore.toggleLoginModal">
        <template v-slot:header>
            <h2 class="text-white text-3xl font-bold">Log in to your account</h2>
            <h3 class="text-placeholder">Welcome back! Please enter your details.</h3>
        </template>

        <template v-slot:body>
            <Form class="flex flex-col gap-4 w-full">
                <InputField name="email" label="Email" placeholder="Enter your email" />
                <InputField name="password" label="Password" placeholder="password" textType="password" />
                <div class="flex flex-row justify-between">
                    <div class="items-center flex">
                        <Field name="remember_me" type="checkbox" class="mr-2 h-4 w-4 rounded-md" value="true" />
                        <label for="remember_me" class="text-white">Remember me</label>
                    </div>
                    <span class="text-my-blue cursor-pointer underline">Forgot password?</span>
                </div>
                <ButtoneRed text="Sign in" />
                <ButtonDark text="Sign in with Google" :gmail="true" />
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
import { useModalStore } from '@/stores/useModalStore.js';
import InputField from '@/components/ui/InputField.vue';
import ButtoneRed from '@/components/ui/ButtonRed.vue';
import ButtonDark from '@/components/ui/ButtonDark.vue';

const modalStore = useModalStore();

</script>