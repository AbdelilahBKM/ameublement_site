import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";

export default function Navigation() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Tissus</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup value="benoit">
                        <MenubarRadioItem value="andy">Pour Salon Maroccain</MenubarRadioItem>
                        <MenubarRadioItem value="benoit">Pour Salon Modérnes</MenubarRadioItem>
                        <MenubarRadioItem value="Luis">Pour Voilage</MenubarRadioItem>
                    </MenubarRadioGroup>
                    <MenubarSeparator />
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Tapisserie</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup value="benoit">
                        <MenubarRadioItem value="andy">Salon Traditionnels</MenubarRadioItem>
                        <MenubarRadioItem value="benoit">Salon Modérnes</MenubarRadioItem>
                        <MenubarRadioItem value="Luis">Canapés</MenubarRadioItem>
                        <MenubarRadioItem value="Luis">Fauteuils</MenubarRadioItem>
                    </MenubarRadioGroup>
                    <MenubarSeparator />
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Literie</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup value="benoit">
                        <MenubarRadioItem value="andy">Sommiers et Têtes de lit</MenubarRadioItem>
                        <MenubarRadioItem value="benoit">Matelas</MenubarRadioItem>
                        <MenubarRadioItem value="Luis">lingerie</MenubarRadioItem>
                    </MenubarRadioGroup>
                    <MenubarSeparator />
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Voilage</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup value="benoit">
                        <MenubarRadioItem value="andy">Tissus pour Voilage</MenubarRadioItem>
                        <MenubarRadioItem value="benoit">Couture & Montage</MenubarRadioItem>
                        <MenubarRadioItem value="Luis">Accessoires</MenubarRadioItem>
                    </MenubarRadioGroup>
                    <MenubarSeparator />
                </MenubarContent>
            </MenubarMenu>
            
        </Menubar>
    )
}
