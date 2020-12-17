let RoleIDMap = {
    "Verified Member": "788919692093292544",// TODO: Make IQ Guild IDs
    "1st Quad": "788919367847903232",
    "2nd Quad": "788919426158297098",
    "Senior": "788919517539205132",
    "GEXP OP": "788919459721117776"
}

module.exports = {
    RoleIDMap: RoleIDMap,
    GuildMemberRole: class {
        async add(member, role) {
            if (!(role in RoleIDMap)) return;

            let roleResolved = await member.guild.roles.fetch(RoleIDMap[role]);

            await member.roles.add(roleResolved);
        }

        async addRole(member, role) {
            return member.roles.add(role);
        }

        async removeRole(member, role) {
            return member.roles.remove(role);
        }

        async remove(member, role) {
            if (!(role in RoleIDMap)) return;

            let roleResolved = await member.guild.roles.fetch(RoleIDMap[role]);

            if (!member.roles.cache.find(r => r.id === role.id)) {
                console.log("Role, " + role.name + "not found!");
                return;
            }

            await member.roles.remove(roleResolved);
        }

        async removeAll(member) {
            for (let key in RoleIDMap) {
                if (key === "Verified Member") continue;
                await this.remove(member, key);
            }
        }

    }
}