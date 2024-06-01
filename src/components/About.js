import React from 'react';
import image from '../images/dolly-pic.jpg';

const About = () => {
  return (
    <div>
      <div className="heading font-medium text-2xl flex justify-center my-4">Creater of this E-Notebook</div>
      <div className="card">
      <div class="flex justify-center">
        <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
          <img class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={image} alt="" />
          <div class="p-6 flex flex-col justify-start">
            <h5 class="text-gray-900 text-xl font-medium mb-2">Dolly Kumari</h5>
            <p class="text-gray-700 text-base mb-4">
              My name is Dolly Kumari, and I am currently pursuing a Master of Computer Applications (MCA) from JD Women's College. Passionate about technology and software development, I am dedicated to honing my skills and expanding my knowledge in the field of computer science. My academic journey has equipped me with a solid foundation in programming, systems analysis, and application development, preparing me for a successful career in the tech industry. 
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default About