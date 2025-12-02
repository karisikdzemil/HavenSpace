import Answer from "../Answer";
import ContentWrapper from "../contentWrapper";

const questions = [
  {
    question: "Question number 1",
    answer: "This is an answer for the previous question. Just for testing...",
  },
  {
    question: "Question number 2",
    answer: "This is an answer for the previous question. Just for testing...",
  },
  {
    question: "Question number 3",
    answer: "This is an answer for the previous question. Just for testing...",
  },
  {
    question: "Question number 4",
    answer: "This is an answer for the previous question. Just for testing...",
  },
  {
    question: "Question number 5",
    answer: "This is an answer for the previous question. Just for testing...",
  },
  {
    question: "Question number 6",
    answer: "This is an answer for the previous question. Just for testing...",
  },
];

export default function AskedQeustions() {
  return (
    <section>
      <ContentWrapper>
        <div className="flex gap-16">
          <div className="w-[40%] flex flex-col gap-10">
            <h2 className="text-5xl font-light w-2/3">Our Property Listings</h2>
            <p className="text-gray-500 font-light">
              Discover your dream property from our curated selection of hosues,
              apartments, and villas. Whether you're looking to buy or rent, we
              offer a variety of options to suit your lifestyle and budget.
            </p>
            <img
              className="w-full h-fit bg-cover rounded-2xl"
              src="./questions_image.png"
              alt="Discover Image 3"
            />
          </div>
          <ul className="w-[55%] px-5 flex flex-col gap-5">
            {questions.map(question => (
                <Answer question={question.question} answer={question.answer}/>
            ))}
          </ul>
        </div>
      </ContentWrapper>
    </section>
  );
}
