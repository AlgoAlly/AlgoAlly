import heroImage from '../public/heroimage.jpeg';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

      <section className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-inter px-6 text-lg">
              Welcome to AlgoAlly, the platform to enhance your interview skills
            </h1>
            <p className="font-pj mt-5 text-4xl leading-tight font-bold sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
              Turn Leetcode into something
              <span className="relative inline-flex sm:inline">
                <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-30 blur-lg filter"></span>
                <span className="relative"> fun </span>
              </span>
            </p>

            <div className="mt-9 px-8 sm:flex sm:items-center sm:justify-center sm:space-x-5 sm:px-0">
              <a
                href="/game"
                title=""
                className="font-pj bg-bg-active inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent px-8 py-3 text-lg font-bold text-white transition-all duration-200 hover:bg-gray-600 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none sm:w-auto"
                role="button"
              >
                Play Now
              </a>

              <a
                href="https://youtu.be/rZAcEhNNpnA"
                title=""
                className="font-pj border-border-primary mt-4 inline-flex w-full items-center justify-center rounded-xl border-2 px-6 py-3 text-lg font-bold transition-all duration-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white focus:border-gray-900 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none sm:mt-0 sm:w-auto"
                role="button"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.18003 13.4261C6.8586 14.3918 5 13.448 5 11.8113V5.43865C5 3.80198 6.8586 2.85821 8.18003 3.82387L12.5403 7.01022C13.6336 7.80916 13.6336 9.44084 12.5403 10.2398L8.18003 13.4261Z"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Watch demo
              </a>
            </div>

            <p className="font-inter mt-8 text-base text-gray-500">
              Helping students stay focused. No subscription required
            </p>
          </div>
        </div>

        <div className="pt-32 pb-12">
          <div className="relative">
            <div className="absolute inset-0 h-2/3"></div>
            <div className="relative mx-auto">
              <div className="lg:mx-auto lg:max-w-6xl">
                <img className="scale-110 transform" src={heroImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
