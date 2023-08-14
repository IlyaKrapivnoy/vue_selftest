<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>Sad Rock Band Name Generator</h1>

    <el-button type="primary" @click="generateName" class="mt-10"
      >Generate Band Name</el-button
    >
    <div class="mt-10 text-2xl">
      <p>
        Your Sad Rock Band Name:
        <span v-if="bandName" class="font-bold text-indigo-600">
          {{ bandName }}
        </span>
      </p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      adjectives: ["Mournful", "Melancholic", "Gloomy", "Sorrowful", "Dreary"],
      nouns: ["Shadows", "Tears", "Whispers", "Echoes", "Solitude"],
      suffixes: [
        "of Despair",
        "of Regret",
        "of Sorrow",
        "from the Abyss",
        "of Longing",
      ],
      bandName: "",
    };
  },
  methods: {
    generateName() {
      const adjective = this.getRandomItem(this.adjectives);
      const noun = this.getRandomItem(this.nouns);
      const suffix = this.getRandomItem(this.suffixes);
      this.bandName = `${adjective} ${noun} ${suffix}`;
    },
    getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
  },
};
</script>
