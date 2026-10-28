<script setup>
import { benefitsStorage } from '@/stores/benefitsCards';

const benefitCards = benefitsStorage();
</script>

<template>
    <div class="g-container">
        <div class="benefits">
            <div class="benefits__card" v-for="el in benefitCards.benefitsArr" :key="el">
                <div class="benefits__card-img-container">
                    <img :src="el.image" :alt="el.title">
                </div>
                <div class="benefits__card-text-container">
                    <h3>{{ el.title }}</h3>
                    <p>{{ el.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.benefits {
    padding-top: 24px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
}

.benefits__card {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border: 1px solid #2c2c2e;
    border-radius: 12px;
    background-color: var(--cream);
    box-shadow:
        rgba(210, 205, 160, 0.5) 0px 2px 4px,
        rgba(180, 170, 120, 0.4) 0px 7px 13px -3px,
        rgba(150, 140, 90, 0.2) 0px -3px 0px inset;
}

.benefits__card-text-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4px;

    h3 {
        font-family: var(--second-family);
        font-weight: 700;
        font-size: 16px;
        color: var(--header-background);
    }

    p {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 13px;
        line-height: 140%;
        color: var(--btn-text);
    }
}

.g-button--benefits {
    margin-top: 10px;
    padding: 12px;
    color: var(--header-background);
    transition: all 0.2s ease-in-out;
}

.g-button--benefits:hover {
    opacity: 0.9;
    scale: 1.02;
}

.benefits__card-text-container>* {
    color: #2c2c2e;
}

@media(min-width:768px) {
    .benefits {
        grid-template-columns: 1fr 1fr 1fr;
        /* padding-left: 32px;
        padding-right: 32px; */
    }

    .benefits__card {
        justify-content: center;
    }

    .benefits__card-text-container {
        h3 {
            font-size: 18px;
        }

        p {
            font-size: 14px;
        }
    }
}

@media(min-width:1440px) {
    /* .benefits {

        padding-left: 80px;
        padding-right: 80px;
    } */
}
</style>