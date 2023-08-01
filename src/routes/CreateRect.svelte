<script lang="ts">
  import { figmaAPI } from "$lib/figmaAPI";
</script>

<div class="create-rect">
  <button
    on:click={() => {
      figmaAPI.run((figma) => {
        figma.createRectangle();
      });
    }}>Create Rectangle</button
  >
</div>
