<template>
    <LayoutModal @close="modalStore.toggleResetPasswordModal">
        <template v-slot:header>
            <h2 class="text-white text-3xl font-bold">Create new password</h2>
            <h3 class="text-placeholder text-center">Your new password must be different from
                previous used passwords</h3>
        </template>

        <template v-slot:body>
            <Form class="flex flex-col gap-4 w-full" @submit="passwordReset">
                <InputField name="password" label="Password" placeholder="At least 8 & max.15 lower case characters"
                    textType="password" rules="required|min:8|max:15|lowercase" />
                <InputField name="password_confirm" label="Confirm Password" placeholder="Confirm your password"
                    textType="password" rules="required|confirmed:@password" />
                <ButtoneRed text="Reset password" type="submit" class="mt-2" />
            </Form>
        </template>
        <template v-slot:footer>
            <div class="flex flex-row gap-1 mx-auto items-center cursor-pointer" @click="switchToLogin()">
                <IconArrowBack class="w-3 h-3" />
                <span class="text-placeholder ">Back to log
                    in</span>
            </div>
        </template>
    </LayoutModal>
</template>
  

<script setup>
import LayoutModal from '@/components/layouts/LayoutModal.vue';
import { Form } from 'vee-validate';
import { useModalStore } from '@/stores/useModalStore.js';
import { useUserStore } from '@/stores/useUserStore.js';
import IconArrowBack from '@/components/icons/IconArrowBack.vue';
import InputField from '@/components/ui/InputField.vue';
import ButtoneRed from '@/components/ui/ButtonRed.vue';
import { resetPassword } from '@/services/auth/auth.js';

const modalStore = useModalStore();
const userStore = useUserStore();


function switchToLogin() {
    modalStore.toggleResetPasswordModal();
    modalStore.toggleLoginModal();
}


async function passwordReset(values) {
    await resetPassword(userStore.token, userStore.email, values.password).then(() => {
        modalStore.toggleResetPasswordModal();
        modalStore.toggleResetPasswordSuccessModal();
    })
        .catch(() => {
            modalStore.toggleResetPasswordModal();
            modalStore.toggleResetPasswordResendModal();
        });
}

</script>