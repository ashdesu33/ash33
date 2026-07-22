const projects =[
    {
        folder: "wen",
        cover: "1.png",
        title:"The body has its own time: Women's time and  the refusal of linear progress",
        category:["Editorial"],
        class:'prj0',
        time: "2026",
        page:'Pages/bodyPrinter.html',
        client: "Wen Zhang",
        team:"",
        description:"Book design for performance artist Wen Zhang's thesis project. Imagining when time is a stack of images, they overlapped like the body, rotate and repeat itself. "
    },
    {
        title:"Here for Now",
        category:["Web"],
        folder: "archive",
        cover: "herefornow.png",
        files: ["herefornow.png"],
        time: "2025",
        client: "RISD GD",
        team:"with Ashley Cai & Li Huang",
        page:'https://www.herefornow.risd.gd/',
        description:"Web design & development for RISD GD senior show. To be is to leave a trace—however slight, however fleeting. Seen, felt, then gone, reminding us that we, too, are only here for now.",
    },
    {
        title:"bonnie'cigar",
        category:["Identity"],
        folder: "bonnie'cigar",
        cover: "1.gif",
        time: "2026",
        client: "for bonnie'cigar",
        team:"",
        description:"bonnie's cigar is an independent publishing project founded by a curator duo. The project explores the gap between image and identity, femininity, myth, criminology and fiction. Its custom animated logotype draws on a Chinese pun on the word 'cigarette' as tomatos, echoing the dark humor with which the project approaches violence, myth, and identity.",
    },
    {
        folder: "bodyPrinter",
        cover: "1.png",
        title:"If Everybody Is A Printer",
        category:["Editorial, UX, Web"],
        class:'prj0',
        time: "2025",
        page:'Pages/bodyPrinter.html',
        client: "Degree Project",
        team:"instructed by Anastasiia Raina",
        description:"If Everybody Is A Printer is Ash Ma’s BFA Graphic Design thesis project at the Rhode Island School of Design. It is an inquiry into the entanglement of human hands, machines, and the act of printing."
    },
    {
        title: "RISD Yearbook 2025",
        category:["Editorial"],
        folder: "yearbook25",
        cover: "portfolio_pdf_0531.png",
        webpCover: "portfolio_pdf_0531.webp",
        page: "Pages/yearbook25.html",
        time: "2025",
        client: "for Rhode Island School of Design",
        team:"with Design Guild",
        description:"The 2025 yearbook is a celebration of what we carry with us and the moments we hold close. Each student page is personalized—decorated and curated like a proud, well-loved fridge door. We dedicate this yearbook as a keepsake for the graduating class of 2025. What’s yours?" ,
    },
    {
        folder: "Liz",
        cover: "5.png",
        title:"el lissitzky",
        category:["Editorial, Packaging"],
        class:'prj0',
        time: "2024",
        page:'Pages/liz.html',
        client: "Grad Type III",
        team:"instructed by Doug Scott",
        description:"If you can see the sound in El Lissitzky's work... Vinyl design featuring El Lissitzky's take on typography."
    },
    {
        folder: "Knoll",
        cover: "1.png",
        title:"Knoll Workplace Research Library",
        category:["Branding"],
        class:'prj0',
        page:'Pages/knoll.html',
        time: "2023",
        client: "for Design Studio 4",
        team:"instructed by Mingkyoung Kim",
        description:"The Knoll Workplace Research Library is dedicated to providing innovative insights on creating superior work environments. With this commitment in mind, the rebranding project of the Knoll Research Library derived from the idea of “dashes”. Not only do these dashes serve to define clean spaces, but they are also the most simple unit in the formulation of idea sketches."
    },
    {
        folder: "Collection",
        cover: "collection.jpg",
        title:"Collection of Knots",
        category:["Poster","Sign"],
        class:'prj2',
        page:'Pages/collection.html',
        time: "2023",
        client: "for Design Studio 3",
        team:"instructed by Rene Payne",
        description:"The Collection of Knots is a poster series organizing 50 knots in the category of [Knots that are Knots] and “Knots that are not Knots]. It later extended to a mini-exhibition that allowed people to knot their own collection, with corresponding instruction of tiding the knot. ",
    },
]

const archive=[
    {
        title:"ALL",
        category:"",
        year:"",
        class:"",
        description:""
    },
    {
        title:"RISD 2025 Yearbook",
        folder: "yearbook25",
        year:"2025",
        category:["Editorial"],
        class:'Design Guild',
        page:'Pages/yearbook25.html'
    },
    {
        title:"If Everybody Is A Printer",
        folder: "bodyPrinter",
        year:"2025",
        category:["Editorial, UX, Web"],
        class:'Design Guild',
        page:'Pages/bodyPrinter.html'
    },
    {
        title:"Feet-washing Heaven",
        folder: "archive/fwh",
        category:"Exhibition",
        year:"2025",
        class:"Collaborative Study Project",
        description:"Drawing inspiration from the space we live in, we(Ash Ma, Lily Wu, Nor Wu) use everyday objects to construct non-sense dialogues. Together, we soak our feet in the warm water of collective making, letting the rituals wash over the boundaries of reason.  The installations are relics of our mundane life in the sanctuary of our imaginative Feet-washing House. "
    },
    {
        folder: "vok",
        title:"Völklingen Ironworks",
        category:["Branding"],
        class:'prj0',
        page:'Pages/vok.html',
        year: "2024",
        client: "Grad Type III",
        team:"instructed by Doug Scott",
        description:"Speculative branding project for UNESCO World Heritage site Völklingen Ironworks, with custom type design inspired by the architect jungle of the factory." ,
    },
    {
        title:"The Indy",
        folder: "indy",
        category:["Editorial"],
        year:"2024",
        class:'The College Hill Independence',
        page:'Pages/indy.html'
    },
    {
        title:"el lissitzky",
        folder: "Liz",
        category:["Editorial"],
        year:"2024",
        class:'Grad Type III',
        page:'Pages/liz.html'
    },
    {
        title:"Knoll Workplace Research Library",
        folder: "Knoll",
        year:"2024",
        category:["Identity"],
        class:'Design Studio 4',
        page:'Pages/knoll.html'
    },
    {
        title:"RISD Yearbook 2024",
        folder: "archive/yearbook24",
        category:["Editorial"],
        year:"2024",
        class:'Rhode Island School of Design',
        description:"The 2024 yearbook takes the viewer away from their common beginnings at RISD into an imagined future where each graduating student is famous. Where and who will they be by 2034? Design with wonderful people @ Design Guild",
    },
    {
        title:"Into the Woods",
        folder: "archive/artistball",
        category:"Promotion",
        year:"2024",
        class:"Design Guild",
        description:"2024 RISD Artist Ball Poster, collaborate with Andrew Liu and Maggie Xian."
    },
    {
        title:"RISD Orientation 2028",
        folder: "archive/orientation",
        category:"Identity",
        year:"2024",
        class:"Design Guild",
        description:"RISD Orientation Identity inspired by the friendship bracelet. Design with Hanna Jeong, Maggie Xian, Andrew Liu"
    },
    {
        title:"ODC 2024",
        folder: "archive",
        files: ["odc_1.gif", "odc_2.png", "odc_1.png", "concept.gif", "odc_4.png", "odc_5.png", "odc_6.png", "odc_7.png"],
        category:"Identity",
        year:"2024",
        class:"another design lab",
        description:"Design pitch for Developer Conference 2024 base on the infinite possibilities inside the empty bracket."
    },
    {
        title:"Elm",
        folder: "archive/elm",
        category:"Type Design",
        year:"2024",
        class:"Grad Type Design",
        description:"Elm is a textface designed for small-size poems. Inspired by Elm by Sylvia Plath."
    },
    {
        title:"The Will to the End",
        folder: "will to the end",
        category:["Editorial, Web"],
        year:"2023",
        class:'TypeIII',
        page:'Pages/end.html'
    },
    {
        title:"Collection of Knots",
        folder: "Collection",
        year:"2023",
        category:["Poster", "Signage"],
        class:'Design Studio 3',
        page:'Pages/collection.html'
    },
    {
        title:"Which Window will Your Arms Reach",
        folder: "archive",
        files: ["window.gif", "window-06.jpg", "window-08.jpg", "window-09.jpg", "window-10.jpg", "window2.gif", "window-07.jpg", "window3.gif", "window-11.jpg"],
        category:"Advertisement",
        year:"2023",
        class:"Design Studio 3",
        description:`Which Window will Your Arms Reach took inpiration from a poem 床边小舞曲 written by 可仔(Ke Zai).
        This project is intended to bring female domestic workers voices to the public, raising awareness and recognition of their labor.
        The original and translated poem can be found in this <a href="https://www.are.na/block/24691378">link</a>.`
    },
    {
        title:"Heads in the cloud",
        folder: "archive",
        files: ["clouds-05.jpg", "clouds-1.jpg", "clouds-02.jpg", "clouds-04.jpg", "clouds-03.jpg"],
        category:"Advertisement",
        year:"2023",
        class:"Design Guild",
        description:"Heads in the cloud proposes visual design for RISD Artist Ball 2023. With Riso printed poster, hand rings, and tickets."
    },
    {
        title:"In the land of everything",
        folder: "archive",
        files: ["risobool.gif", "risobool.jpg", "risobool2.jpg", "risobool3.jpg", "risobool4.jpg", "risobool5.jpg", "risobool6.jpg", "risobool7.jpg"],
        category:"Editorial,Riso",
        year:"2023",
        class:"RISD Riso Workshop",
        description:"2-4 color riso printed zine, featuring films taken in China. Recoding this land of everything."
    },
    {
        title:"One Way Space",
        folder: "oneway",
        category:["Advertisement","Editorial"],
        year:"2023",
        class:"One Way Space",
        description:"Book cover & Event Identity design for Owspace. Art Director: Li Zhaolu",
    },
    {
        title:"Ways of Communication",
        folder: "archive",
        files: ["communicate.gif", "communicate.PNG", "communicate2.PNG", "c1.jpg", "16.jpg", "12.jpg", "communicate3.PNG"],
        category:"Editorial",
        year:"2023",
        class:"Type III",
        description:"Thematic Book on Writing System printed on newsprint,section sewn."
    },
    {
        title:"Fortune Bag",
        folder: "archive",
        files: ["bag-12.jpg", "bag-13.jpg", "bag-14.jpg", "bag-15.jpg", "bag-16.jpg", "bag-17.jpg"],
        category:"Advertisement",
        year:"2023",
        class:"Design Studio 2",
        description:`The fortune kit is a souvenir I design for my classmate. The design idea comes from my memory of learning embroidery with my mom during the Chinese New Year.
    I wish to share this memory with an actual experience. As my mom had told me, <i>fortune is always in your hand</i>.`
    },
    {
        title:"What do you want to say?",
        folder: "archive",
        files: ["w1.jpg", "w2.jpg", "w3.jpg", "w4.jpg", "w5.jpg", "w6.JPG"],
        category:"Editorial",
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
        folder: "Cyborg Manifesto",
        year:"2022",
        category:["Editorial"],
        class:'Design Studio 1',
        page:'Pages/cyborg.html'
    },
    {
        title:"Color Quilt",
        folder: "archive",
        files: ["quilt.jpg", "quilt2.jpg", "quilt3.jpg"],
        category:"Text",
        year:"2022",
        class:"Color & Surface",
        description:`Color Quilt is a modular textile piece inspired by quilts made by the hands of mothers.
      Made in found fabric scraps, it is intended to explore color and surface in a versatile form, with 
      care and collaboration. Project collaborated with Radhika Chauhan.`
    },
    {
        title:"Poster Collection",
        folder: "archive/pos",
        category:"Editorial",
        year:"General",
        class:"",
        description:""
    },
]

function goTo(page){
    if (page && page.startsWith('http')) {
        window.open(page, '_blank');
        return;
    }
    const index = projects.findIndex(p => p.page === page);
    if (index >= 0 && typeof scrollToProject === 'function') {
        scrollToProject(index);
    }
}
