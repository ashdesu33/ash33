const projects =[
    {
        cover:"Image/will to the end/layout.jpg",
        title:"The Will to the End",
        category:["Editorial,Web,Book"],
        class:'prj0',
        page:'Pages/end.html'
    },
    {
        cover:"Image/indy/page2-min.png",
        title:"The Indy",
        category:["Editorial","Identity"],
        class:'prj4',
        page:'Pages/indy.html'
    },
    {
        cover:"Image/Liz/5.png",
        title:"el lissitzky",
        category:["Editorial, Packaging"],
        class:'prj0',
        page:'Pages/liz.html'
    },
    {
        cover:"Image/vok/doc8.jpg",
        title:"Völklingen Ironworks",
        category:["Branding"],
        class:'prj0',
        page:'Pages/vok.html'
    },
    {
        cover:"Image/Knoll/cover.png",
        title:"Knoll Workplace Research Library",
        category:["Branding"],
        class:'prj0',
        page:'Pages/knoll.html'
    },
    {
        cover:"Image/archive/yearbook24/1.jpg",
        title:"RISD 2024 Yearbook",
        category:["Book"],
        class:'Design Guild',
        page:'Pages/yearbook.html'
    },
    {
        cover:"Image/Collection/collection.jpg",
        title:"Collection of Knots",
        category:["Poster","Sign"],
        class:'prj2',
        page:'Pages/collection.html'
    },
    {
        cover:"Image/printer/cover.gif",
        title:"Thinking about the Plotter [ongoing]",
        category:["CTC","Web"],
        class:'prj4',
        page:'Pages/printer.html'
    },
    {
        cover:"Image/Birthdaycake/cake.gif",
        title:"Birthdaycake",
        category:["Code,Blender"],
        class:'prj1',
        page:'Pages/cake.html'
    }
    // {
    //     cover:"Image/Cyborg Manifesto/cyborg.gif",
    //     title:"Cyborg Manifesto",
    //     category:["Editorial","Book"],
    //     class:'prj3',
    //     page:'Pages/cyborg.html'
    // }

    // {
    //     cover:"Image/Random Thoughts/cover.JPG",
    //     title:"Random Thoughts",
    //     category:["Book","Drawings"],
    //     class:'prj6',
    //     page:'Pages/random.html'
    // }

]

const archive=[
    {
        title:"ALL",
        category:"",
        img:[],
        year:"",
        class:"",
        description:""
    },
    // {
    //     title:"The Will to the End",
    //     category:["Ed,Web"],
    //     img:["Image/will to the end/layout.jpg"],
    //     year:"2023",
    //     class:'TypeIII',
    //     page:'Pages/end.html'
    // },
    // {
    //     title:"The Indy",
    //     img:["Image/indy/page2-min.png"],
    //     category:["Ed"],
    //     year:"2024",
    //     class:'The College Hill Independence',
    //     page:'Pages/indy.html'
    // },
    // {
    //     title:"el lissitzky",
    //     img:["Image/Liz/5.png"],
    //     category:["Ed"],
    //     year:"2024",
    //     class:'Grad Type III',
    //     page:'Pages/liz.html'
    // },
    // {
    //     title:"RISD 2024 Yearbook",
    //     img:["Image/archive/yearbook24/1.jpg"],
    //     year:"2024",
    //     category:["Ed"],
    //     class:'Design Guild',
    //     page:'Pages/yearbook.html'
    // },
    // {
    //     title:"Knoll Workplace Research Library",
    //     img:["Image/Knoll/cover.png"],
    //     year:"2024",
    //     category:["Id"],
    //     class:'Design Studio 4',
    //     page:'Pages/knoll.html'
    // },
    // {
    //     title:"Collection of Knots",
    //     img:["Image/Collection/collection.jpg"],
    //     year:"2023",
    //     category:["Poster","Sign"],
    //     class:'Design Studio 3',
    //     page:'Pages/collection.html'
    // },
    // {
    //     title:"Cyborg Manifesto",
    //     img:["Image/Cyborg Manifesto/cyborg.gif"],
    //     year:"2022",
    //     category:["Ed"],
    //     class:'Design Studio 1',
    //     page:'Pages/cyborg.html'
    // },
    {title:"Into the Woods",
        category:"Promo",
        img:["../Image/archive/artistball/artist-ball-animation_update.gif","../Image/archive/artistball/4.png",
            "../Image/archive/artistball/5.png"],
        year:"2024",
        class:"Design Guild",
        description:"2024 RISD Artist Ball Poster, collaborate with Andrew Liu and Maggie Xian."
    },
    {title:"RISD Orientation 2028",
        category:"Id",
        img:["../Image/archive/orientation/banner.gif","../Image/archive/orientation/1.png",
            "../Image/archive/orientation/2.png","../Image/archive/orientation/links.gif",
            "../Image/archive/orientation/loop_ring.gif",
            "../Image/archive/orientation/3.png"
        ],
        year:"2024",
        class:"Design Guild",
        description:"RISD Orientation Identity inspired by the friendship bracelet. Design with Hanna Jeong, Maggie Xian, Andrew Liu"
    },
    {title:"ODC 2024",
        category:"Id",
        img:["../Image/archive/odc_1.gif","../Image/archive/odc_1.png",
            "../Image/archive/odc_2.png","../Image/archive/concept.gif","../Image/archive/odc_4.png", 
            "../Image/archive/odc_5.png","../Image/archive/odc_6.png","../Image/archive/odc_7.png"
        ],
        year:"2024",
        class:"another design lab",
        description:"Design pitch for Developer Conference 2024 base on the infinite possibilities inside the empty bracket."
    },
    {title:"Elm",
        category:"Type",
        img:["../Image/archive/elm/regular.png","../Image/archive/elm/1.jpg","../Image/archive/elm/2.jpg"],
        year:"2024",
        class:"Grad Type Design",
        description:"Elm is a textface designed for small-size poems. Inspired by Elm by Sylvia Plath."
    },
    {title:"Which Window will Your Arms Reach",
        category:"Promo",
        img:["../Image/archive/window.gif","../Image/archive/window-06.jpg","../Image/archive/window-08.jpg",
        "../Image/archive/window-09.jpg","../Image/archive/window-10.jpg","../Image/archive/window2.gif","../Image/archive/window-07.jpg",
        "../Image/archive/window3.gif","../Image/archive/window-11.jpg"],
        year:"2023",
        class:"Design Studio 3",
        description:`Which Window will Your Arms Reach took inpiration from a poem 床边小舞曲 written by 可仔(Ke Zai).
        This project is intended to bring female domestic workers voices to the public, raising awareness and recognition of their labor.
        The original and translated poem can be found in this <a href="https://www.are.na/block/24691378">link</a>.`
       },
    {title:"Heads in the cloud",
     category:"Promo",
     img:["../Image/archive/clouds-05.jpg","../Image/archive/clouds-1.jpg","../Image/archive/clouds-02.jpg","../Image/archive/clouds-04.jpg","../Image/archive/clouds-03.jpg"],
     year:"2023",
     class:"Design Guild",
     description:"Heads in the cloud proposes visual design for RISD Artist Ball 2023. With Riso printed poster, hand rings, and tickets."
    },
    {title:"In the land of everything",
     category:"Ed,Riso",
     img:["../Image/archive/risobool.gif","../Image/archive/risobool.jpg","../Image/archive/risobool2.jpg","../Image/archive/risobool3.jpg",
     "../Image/archive/risobool4.jpg","../Image/archive/risobool5.jpg","../Image/archive/risobool6.jpg","../Image/archive/risobool7.jpg"],
     year:"2023",
     class:"RISD Riso Workshop",
     description:"2-4 color riso printed zine, featuring films taken in China. Recoding this land of everything."
    },
    {
        title:"One Way Space",
        category:["Id","Ed"],
        img:["../Image/oneway/page.jpg","../Image/oneway/identity.png","../Image/oneway/page2.png","../Image/oneway/insert2.png",
            "../Image/oneway/page3.jpg","../Image/oneway/page4.png","../Image/oneway/page5.png"],
        year:"2023",
        class:"One Way Space",
        description:"Book cover & Event Identity design for Owspace. Art Director: Li Zhaolu",
    },
    {title:"Ways of Communication",
    category:"Ed",
    img:["../Image/archive/communicate.gif","../Image/archive/communicate.PNG","../Image/archive/communicate2.PNG","../Image/archive/c1.jpg",
    "../Image/archive/16.jpg","../Image/archive/12.jpg","../Image/archive/communicate3.PNG"],
    year:"2023",
    class:"Type III",
    description:"Thematic Book on Writing System printed on newsprint,section sewn."
   },
   {title:"Fortune Bag",
   category:"Promo",
   img:["../Image/archive/bag-12.jpg","../Image/archive/bag-13.jpg","../Image/archive/bag-14.jpg","../Image/archive/bag-15.jpg",
   "../Image/archive/bag-16.jpg","../Image/archive/bag-17.jpg"],
   year:"2023",
   class:"Design Studio 2",
   description:`The fortune kit is a souvenir I design for my classmate. The design idea comes from my memory of learning embroidery with my mom during the Chinese New Year.
    I wish to share this memory with an actual experience. As my mom had told me, <i>fortune is always in your hand</i>.`
  },
   {title:"What do you want to say?",
   category:"Ed",
   img:["../Image/archive/w1.jpg","../Image/archive/w2.jpg","../Image/archive/w3.jpg","../Image/archive/w4.jpg","../Image/archive/w5.jpg","../Image/archive/w6.JPG"],
   year:"2022",
   class:"Embodying Feminism",
   description:`This project does not intend to say theory and experience are incompatible and which is better than the others. Instead, it is my intention to document my attempts at these lack narration.
   Each envelope consists of <br>
   <b>1.</b> <i>a dialogue with people who are really closed in my life(my mother, my friend, and my partner)</i>
   <br><b>2.</b> <i>the context of the conversation</i>
   <br><b>3.</b> <i>a reflection letter to the person I had a conversation with.</i>`
    },
    {
        title:"Cyborg Manifesto",
        img:["Image/Cyborg Manifesto/cyborg.gif"],
        year:"2022",
        category:["Ed"],
        class:'Design Studio 1',
        page:'Pages/cyborg.html'
    },
    {title:"Color Quilt",
     category:"Text",
     img:["../Image/archive/quilt.jpg","../Image/archive/quilt2.jpg","../Image/archive/quilt3.jpg"],
     year:"2022",
     class:"Color & Surface",
     description:`Color Quilt is a modular textile piece inspired by quilts made by the hands of mothers.
      Made in found fabric scraps, it is intended to explore color and surface in a versatile form, with 
      care and collaboration. Project collaborated with Radhika Chauhan.`
    },
    // {
    //     title:"Birthdaycake",
    //     img:["Image/Birthdaycake/cake.gif"],
    //     category:["Code,Blender"],
    //     year:"2023",
    //     class:'CSCI 1230',
    //     page:'Pages/cake.html'
    // },
    {title:"Poster Collection",
        category:"Promo",
        img:["../Image/archive/pos/1.png","../Image/archive/pos/2.png","../Image/archive/pos/Frame 7.png",
            "../Image/archive/pos/4.png",
            "../Image/archive/pos/5.png","../Image/archive/pos/3.png",
           "../Image/archive/pos/6.jpg", "../Image/archive/pos/draw.png"],
        year:"General",
        class:"",
        description:""
       }
    // },
    // {title:"Sketchbook",
    //  category:"Drawings",
    //  img:[""],
    //  year:"General",
    //  description:""
    // }

]

function goTo(page){
    window.location.href = page;
}