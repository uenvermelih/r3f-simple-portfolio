import { useGLTF, Center, Environment, Float, PresentationControls, ContactShadows, Html, Text, useMatcapTexture } from '@react-three/drei'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function Experience() {
    const computer = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf")
    const statue = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lucy/model.gltf")
    const reactLogo = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/react-logo/model.gltf")
    const ruby = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ruby/model.gltf")
    const coin = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/coin/model.gltf")

    const rubyRef = useRef()
    const coinRef = useRef()
    const computerRef= useRef()
    const screenRef= useRef()
    const logoRef= useRef()
    const pivotRef= useRef()
    const animationFrameRef= useRef()
    


    useFrame((state, delta) => {
        rubyRef.current.rotation.y += delta * 0.2
        coinRef.current.rotation.y += delta * 0.5
        pivotRef.current.rotation.z += delta * 0.3
    })

    const [ computerPosition, setComputerPosition ] = useState([0, -1.5, 0])

    const eventHandler = () => {

        cancelAnimationFrame(animationFrameRef.current);

        const targetPosition = computerRef.current.position.z === 0 ? [0, -0.8, 3.8] : [0, -1.5, 0];

        const animate = () => {
            const currentPosition = computerRef.current.position.toArray();
            const newPosition = currentPosition.map((coord, index) => {
              const delta = targetPosition[index] - coord;
              const speed = delta * 0.05; // Adjust the speed of the animation here
              return coord + speed;
            });
        
            computerRef.current.position.set(...newPosition);
        
            if (
              Math.abs(newPosition[0] - targetPosition[0]) > 0.001 ||
              Math.abs(newPosition[1] - targetPosition[1]) > 0.001 ||
              Math.abs(newPosition[2] - targetPosition[2]) > 0.001
            ) {
              animationFrameRef.current = requestAnimationFrame(animate);
            }
          };
        
          animate();
    }

    return <>

        <Environment preset='city' />

        <color args={["#210036"]} attach="background" />


        <PresentationControls 
            global
            rotation={ [ 0.1, -0.4, 0 ] }
            polar={ [ -0.4, 0.4 ] }
            azimuth={ [ -1, 0.75 ] }
            config={ { mass:2, tension: 200 } }
            snap={ { mass:4, tension: 400 } }
        >

            <Float rotationIntensity={0.4}>
                <rectAreaLight 
                    width={2.5}
                    height={ 1.65 }
                    intensity={ 65 }
                    color={ "#8b1ec4" }
                    rotation={ [ 0.1, Math.PI, 0 ] }
                    position={ [ 0, 0.55, -1.15 ] }
                />


                    <primitive 
                        object={computer.scene} 
                        ref={ computerRef }
                        position={ computerPosition }
                        onClick={ (event) => {
                            event.stopPropagation();
                            eventHandler();
                        } }
                        
                    >
                        <Html
                            ref={ screenRef }
                            transform 
                            wrapperClass='htmlScreen' 
                            distanceFactor={ 1.17 }
                            position={ [ 0, 1.56, -1.4 ] }
                            rotation-x={ -0.256 }
                            > 

                            <iframe src='https://business-card-tau.vercel.app/'/>

                        </Html>
                    </primitive>
                    

                <Text
                    font='./bangers-v20-latin-regular.woff'
                    fontSize={ 0.5 }
                    position={ [ 0.2, 1.5, -3 ] } 
                >
                Portfolio of Melih Uenver
                </Text>

            </Float>

        </PresentationControls>

        <group ref={pivotRef} position={[-2.5, 1, -1]}>
            <Float rotationIntensity={0.0}>
                <primitive 
                    ref={logoRef}
                    object={ reactLogo.scene }
                    position={ [ 0, -1, 0 ] }
                    scale={ 0.7 }
                    />
            </Float>
        </group>

        <Float rotationIntensity={0.5} >
            <primitive 
                ref={ rubyRef }
                object={ ruby.scene }
                position={ [ -2.9, 0, 1 ] }
                scale={ 0.5 }
                />
        </Float>

        <Float rotationIntensity={1} >
            <primitive 
                ref={ coinRef }
                object={ coin.scene }
                position={ [ 4, 0, 2 ] }
                scale={ 1 }
                />
        </Float>

        <primitive 
            object={ statue.scene } 
            position={ [ 4, -1, 0 ] }
            rotation={ [ 0, Math.PI * 1.6, 0 ] }
            scale={3}
        />
        

        <ContactShadows position-y={ -2.6 } blur={ 1.4 }/>

    </>
}