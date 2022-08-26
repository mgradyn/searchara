import * as tf from "@tensorflow/tfjs-core";

export const InitInference = () => {
  const initClassificationInference = async (model) => {
    const tensor = tf.zeros([1, 96, 96, 3], "float32");
    tf.engine().startScope();
    await model
      .predict(tensor)
      .data()
      .then(() => {
        tensor.dispose();
        tf.engine().endScope();
      });
  };

  const initDetectionInference = async (model) => {
    const tensor = tf.zeros([1, 10, 10, 3], "int32");
    tf.engine().startScope();

    await model.executeAsync(tensor).then(() => {
      tensor.dispose();
      tf.engine().endScope();
    });
  };

  return { initClassificationInference, initDetectionInference };
};
