figma.showUI(
  `<script>window.location.href = 'http://localhost:5173'</script>`,
  {
    width: 700,
    height: 700,
  }
);

figma.ui.onmessage = async (message, props) => {
  if (props.origin !== "http://localhost:5173") {
    return;
  }

  switch (message.type) {
    case "EVAL": {
      const fn = eval.call(null, message.code);

      try {
        const result = await fn(figma, message.params);
        figma.ui.postMessage({
          type: "EVAL_RESULT",
          result,
          id: message.id,
        });
      } catch (e) {
        figma.ui.postMessage({
          type: "EVAL_REJECT",
          error:
            typeof e === "string"
              ? e
              : e && typeof e === "object" && "message" in e
              ? e.message
              : null,
          id: message.id,
        });
      }

      break;
    }
  }
};
