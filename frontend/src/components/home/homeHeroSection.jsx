import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../contentWrapper";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function HomeHeroSection() {
  return (
    <section className="bg-[#FBFCFC] pt-24 pb-4 overflow-hidden">
      <ContentWrapper>
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            initial="hidden"
            animate="show"
            variants={container}
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 bg-[#327878] text-white px-5 py-2.5 rounded-full shadow-lg shadow-[#327878]/20">
              <FontAwesomeIcon icon={faStar} className="text-[10px]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Premium Properties
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Discover Your <br />
              <span className="text-[#327878]">Perfect Home</span> <br />
              in the City.
            </motion.h1>

            <motion.p variants={item} className="text-gray-400 text-lg font-medium max-w-lg leading-relaxed">
              Browse thousands of verified luxury listings from our network of elite
              agents. Your dream residence is just one search away.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-10 pt-4">
              <div>
                <h3 className="text-4xl font-black text-slate-900">12K+</h3>
                <p className="text-gray-400 text-sm font-medium mt-1">
                  Properties Listed
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-slate-900">4.9★</h3>
                <p className="text-gray-400 text-sm font-medium mt-1">
                  Client Rating
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-slate-900">850+</h3>
                <p className="text-gray-400 text-sm font-medium mt-1">
                  Expert Agents
                </p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link to="/properties" className="block bg-[#327878] text-white px-8 py-4 rounded-2xl font-black text-sm transition-colors duration-300 shadow-xl shadow-[#327878]/20">
                  Explore Properties
                </Link>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("featured-properties")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white border border-gray-200 text-slate-900 px-8 py-4 rounded-2xl font-black text-sm hover:border-[#327878] hover:text-[#327878] transition-all duration-300"
              >
                View Listings
              </motion.button>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-5 pt-4">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
                  className="w-12 h-12 rounded-full border-3 border-white object-cover"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
                  className="w-12 h-12 rounded-full border-3 border-white object-cover"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
                  className="w-12 h-12 rounded-full border-3 border-white object-cover"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80"
                  className="w-12 h-12 rounded-full border-3 border-white object-cover"
                  alt=""
                />
              </div>

              <div>
                <p className="font-black text-slate-900">
                  Trusted by 15,000+ happy homeowners
                </p>
                <p className="text-gray-400 text-sm">
                  Find your next dream property today
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 relative mt-20 lg:mt-0"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl z-10 aspect-4/3">
               <img
                 src="/heroSectionSoldHouse.png"
                 className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                 alt="Luxury Exterior"
               />

               <motion.div
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
                 className="absolute top-8 right-8 bg-white px-6 py-4 rounded-3xl shadow-xl z-20"
               >
                  <p className="text-[#327878] font-black text-2xl tracking-tighter">$850,000</p>
                  <p className="text-gray-300 font-black uppercase text-[9px] tracking-widest">Featured Property</p>
               </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="absolute -top-16 -left-12 w-64 h-64 rounded-4xl border-12 border-white shadow-2xl overflow-hidden z-20 hidden md:block"
            >
               <img
                 src="/home-interior.png"
                 className="w-full h-full object-cover"
                 alt="Luxury Interior"
               />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
              className="absolute -bottom-10 left-10 bg-white p-5 rounded-4xl shadow-2xl z-30 flex items-center gap-4 border border-gray-50 min-w-[280px]"
            >
               <img
                 src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                 className="w-14 h-14 rounded-2xl object-cover"
                 alt="Sarah Johnson"
               />
               <div>
                  <h4 className="font-black text-slate-900 text-sm">Sarah Johnson</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Top Real Estate Agent</p>
                  <div className="flex text-yellow-400 text-[9px] mt-1 gap-0.5">
                    {[...Array(5)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
                    <span className="text-gray-300 ml-2 font-bold italic underline">4.9 (127 reviews)</span>
                  </div>
               </div>
            </motion.div>

            <div className="absolute z-0 -bottom-20 -right-20 w-80 h-80 bg-[#327878]/5 rounded-full blur-3xl"></div>
          </motion.div>

        </div>
      </ContentWrapper>
    </section>
  );
}
