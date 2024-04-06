## Demo

Demo link : [Click here](https://mrpinacolada.github.io/test22/)
GH : [Click here](https://github.com/MrPinacolada/spider)
NPM : [Click here](https://www.npmjs.com/package/amazing__spider)

## Installation

Install amazing\_\_spider with npm

```bash
  npm install amazing__spider
```

## Usage/Examples

```
 <template>
  <div style="position: absolute; z-index: -1; width: 100%; height: 100%">
    <amazing-spider background_color="#fff" dots_border_color="rgba(10, 163, 243, 0.39)" />
  </div>
</template>

<script setup lang="ts">
import amazingSpider from "amazing__spider";
</script>
```

## Props:

<table>
  <thead>
    <tr>
      <th>Props</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tentacle_start</td>
      <td>String (first color of tantacle's gradient)</td>
    </tr>
    <tr>
      <td>tentacle_end</td>
      <td>String (last color of tantacle's gradient)</td>
    </tr>
    <tr>
      <td>background_color</td>
      <td>String (canvas background)</td>
    </tr>
    <tr>
      <td>center_color</td>
      <td>String (color of slider's head)</td>
    </tr>
    <tr>
      <td>dots_color</td>
      <td>String (colors of dots scattered around)</td>
    </tr>
    <tr>
      <td>dots_border_color</td>
      <td>String (colors of dots when spider steps on them)</td>
    </tr>
  </tbody>
</table>
